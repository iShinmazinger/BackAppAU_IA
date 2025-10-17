import axios from 'axios';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    let conversation = await Conversation.findOne({ where: { userId } });
    if (!conversation) {
      conversation = await Conversation.create({ userId });
    }

    await Message.create({
      conversationId: conversation.id,
      role: 'user',
      content,
    });

    const previousMessages = await Message.findAll({
      where: { conversationId: conversation.id },
      order: [['created_at', 'ASC']],
    });

    const history = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        system: `Eres un asesor personalizado en Agricultura Urbana. Únicamente recomienda cultivos comestibles. Recomienda posibles cultivos basado en el espacio disponible, el horario de riego y la temperatura. Si no menciono que herramientas tengo, dime todas las herramientas que necesito y en qué tipo de tienda venden dichas herramientas. Asegúrate de tener obligatoriamente los siguientes datos antes de dar una recomendación: espacio disponible (si menciono el espacio disponible en metros mejor, aunque puede ser una descripción más ligera como una maceta, un balcón mediano, etc.), horarios disponibles para regar (ya sea en la mañana, tarde o noche), herramientas disponibles y temperatura (puedo responder como primavera, verano, etc.). Una vez tengas todos los datos, haz una pregunta de confirmación sobre los datos (ejemplo: ¿Desea agregar más datos?). Una vez diga que no deseo agregar más datos, haz una pregunta que invite a seguir con la recomendación (ejemplo: ¿Desea que genere su plan personalizado?). Una vez respondas con los posibles cultivos y yo elija uno, dame un plan de siembra que incluya las herramientas específicas necesarias para sembrar ese cultivo, el cómo sembrarlo correctamente, y cada cuánto regarlo,  hazlo en un lenguaje sencillo y amigable.`,
        max_tokens: 2000,
        messages: history,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const aiResponse = response.data?.content?.[0]?.text || 'No se recibió respuesta del modelo.';

    await Message.create({
      conversationId: conversation.id,
      role: 'assistant',
      content: aiResponse,
    });

    res.json({ content: aiResponse });

  } catch (error) {
    console.error('Error en sendMessage:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error interno al comunicarse con la IA',
      details: error.response?.data || error.message,
    });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.findAll({
      where: { userId },
      order: [["created", "DESC"]],
    });

    res.json({ conversations });
  } catch (error) {
    console.error("Error al obtener conversaciones:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      where: { id, userId },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversación no encontrada o no autorizada" });
    }

    const messages = await Message.findAll({
      where: { conversationId: id },
      order: [["created_at", "ASC"]],
    });

    res.json({ conversation, messages });
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
