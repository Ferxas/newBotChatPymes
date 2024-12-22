import { useState } from "react";
import API from "../services/api";
import ChatBubble from "../components/ChatBubble";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const response = await API.post("/chat/message", { message });
      setResponses([...responses, { sender: "user", text: message }, { sender: "bot", text: response.data.bot_response }]);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Chat con Asistente</h2>
      <div className="h-64 overflow-y-auto mb-4 border p-4 rounded">
        {responses.map((res, index) => (
          <ChatBubble key={index} text={res.text} sender={res.sender} />
        ))}
        {loading && <Loader />}
      </div>
      <Input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button text="Enviar" onClick={sendMessage} />
    </div>
  );
}

export default ChatPage;