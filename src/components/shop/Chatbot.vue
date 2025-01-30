<template>
    <v-container>
      <v-row>
        <v-col md="12" cols="12">
            <div class="chatbot">
                <v-col>
                    <v-btn
                    icon
                    class="copy-btn"
                    @click="copyChatContent"
                    >
                    <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                </v-col>

                <v-col md="12" cols="12">
                    <div v-for="message in messages" 
                        :key="message.id" class="message" 
                        :class="message.sender === 'User' ? 'user-message' : 'bot-message'" 
                        v-html="formatMessage(message)">
                    </div>
                </v-col>
            </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="12" cols="12">        
          <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Stelle eine Frage..." />
          <button @click="sendMessage">Senden</button>
        </v-col>
      </v-row>

    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  // API-Key für OpenAI
  const apiKey = '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';
  
  // Nachrichten-Array und Eingabewert
  const messages = ref<Array<{ id: number; sender: string; text: string }>>([]);
  const userInput = ref<string>('');
  
  // Funktion, um die Nachricht zu senden
  const sendMessage = async () => {
    if (userInput.value.trim() === '') return;
  
    // Füge die Nutzeranfrage zu den Nachrichten hinzu
    messages.value.push({ id: Date.now(), sender: 'User', text: userInput.value });
  
    try {
      const sendQuestion = userInput.value;
      userInput.value = "";
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Du bist ein Logistik-Experte. Deine Aufgabe ist es, Fragen zu Themen wie Inbound, Outbound, Lagerung und Supply Chain zu beantworten. Erkläre bitte kurz und präzise. Du bist auch ein Experte in der Informatik und kannst mich bei allen anliegen rund um das Programmieren von Softwarelösungen helfen.' },
            { role: 'user', content: sendQuestion },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response)
  
      const answer = response.data.choices[0].message.content.trim();
      messages.value.push({ id: Date.now() + 1, sender: 'Bot', text: answer });
    } catch (error) {
      // Logge den Fehler genauer, um zu sehen, was passiert
      if (axios.isAxiosError(error)) {
        console.error('Axios Fehler:', error.response?.data);
      } else {
        console.error('Fehler:', error);
      }
      messages.value.push({ id: Date.now() + 1, sender: 'Bot', text: 'Darauf weiß ich keine Antwort.' });
    }
  
    // Leere das Eingabefeld nach dem Absenden
    userInput.value = '';
  };
  
  // Funktion zum Kopieren des Chat-Inhalts in die Zwischenablage
  const copyChatContent = () => {
    const chatContent = messages.value.map(message => `${message.sender}: ${message.text}`).join('\n');
    navigator.clipboard.writeText(chatContent)
      .then(() => {
        console.log("Chat-Inhalt wurde in die Zwischenablage kopiert.");
      })
      .catch((err) => {
        console.error("Fehler beim Kopieren:", err);
      });
  };
  
  // Funktion zum Formatieren der Nachricht mit HTML
  const formatMessage = (message: { sender: string, text: string }) => {
    let formattedText = message.text;
  
    // Absätze trennen, ohne Aufzählungen
    formattedText = formattedText.replace(/\n/g, '</p><p>');
    formattedText = `<p>${formattedText}</p>`; // Damit der Text mit einem Absatz beginnt
  
    return formattedText;
  };
  </script>
  
  <style scoped>
  .chatbot {
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #4EA8DE;
    max-width: 600px;
    position: relative;
    padding-top: 40px;
    height: auto;
    min-height: 600px;
    overflow-y: auto;
    text-align: left;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .user-message {
    background-color: #e3f2fd; /* Hellblau für den Frageblock */
    border-radius: 10px;
    padding: 10px;
  }
  
  .bot-message {
    background-color: #f1f8e9; /* Hellgrün für den Antwortblock */
    border-radius: 10px;
    padding: 10px;
  }
  
  input {
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 80%;
  }
  
  button {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    margin-left: 5%;
    width: 10%;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  /* Stile für den Kopier-Button */
  .copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .copy-btn v-icon {
    font-size: 24px;
    color: white;
  }
  
  ul, ol {
    margin-left: 20px;
  }
  </style>
  