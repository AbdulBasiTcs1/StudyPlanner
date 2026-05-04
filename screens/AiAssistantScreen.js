// screens/AiAssistantScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Alert, ActivityIndicator
} from 'react-native';
import { useApp } from '../AppContext';
import { COLORS } from '../theme';

export default function AiAssistantScreen() {
  const { aiNotes, addAiNote, deleteAiNote } = useApp();

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to call Wikipedia Summary API (Free, No API Key Required)
  const askAssistant = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a topic to summarize.');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(prompt.trim())}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.status === 404 || data.title === 'Not found') {
        setResponse("Sorry, I couldn't find a summary for that topic. Try being more specific.");
      } else if (data.type === 'disambiguation') {
        setResponse("That topic is too broad and refers to multiple things. Please be more specific (e.g., 'Apple Inc.' instead of 'Apple').");
      } else if (data.extract) {
        setResponse(data.extract);
      } else {
        setResponse('No summary generated.');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch summary. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const saveResponse = () => {
    if (!response) return;
    addAiNote({
      prompt: prompt,
      response: response
    });
    Alert.alert('Success', 'Study Note saved to Database!');
    setPrompt('');
    setResponse('');
  };

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* ── Header ──────────────────────────── */}
      <View className="bg-primary px-[15px] pt-4 pb-6 rounded-b-[22px]">
        <Text className="text-[17px] font-black text-white">AI Study Assistant</Text>
        <Text className="text-[11px] text-white/60 mt-0.5">Powered by Wikipedia API (Free)</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>

        {/* Prompt Input */}
        <Text className="text-[12px] font-bold text-text mb-1">What topic do you want to summarize?</Text>
        <TextInput
          className="border-[1.5px] border-border rounded-xl p-3 text-[13px] text-text bg-card mb-4 min-h-[60px]"
          placeholder="e.g., Artificial Intelligence, Machine Learning..."
          value={prompt}
          onChangeText={setPrompt}
        />

        {/* Action Button */}
        <TouchableOpacity
          className="bg-primary rounded-xl py-3.5 items-center mb-6"
          onPress={askAssistant}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-extrabold text-[14px]">Summarize Topic 📚</Text>
          )}
        </TouchableOpacity>

        {/* Response Area */}
        {response ? (
          <View className="bg-primaryBg border border-primary/30 rounded-xl p-4 mb-6">
            <Text className="text-[14px] font-bold text-primary mb-2">Summary:</Text>
            <Text className="text-[13px] text-text leading-5 mb-4">{response}</Text>

            <TouchableOpacity
              className="bg-white border border-border rounded-lg py-2.5 items-center"
              onPress={saveResponse}
            >
              <Text className="text-primary font-extrabold text-[12px]">💾 Save to Notes</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Saved Notes List */}
        <Text className="text-[14px] font-bold text-text mb-3 mt-2">Saved Summaries</Text>
        {aiNotes.length === 0 ? (
          <Text className="text-[12px] text-muted text-center mb-10">No notes saved yet.</Text>
        ) : (
          aiNotes.map((note) => (
            <TouchableOpacity
              key={note.id}
              className="bg-card rounded-xl p-4 mb-3 border border-border"
              onLongPress={() => {
                Alert.alert("Delete Note", "Delete this saved note?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => deleteAiNote(note.id) }
                ]);
              }}
            >
              <Text className="text-[11px] font-bold text-primary mb-1">Topic: {note.prompt}</Text>
              <Text className="text-[12px] text-text mt-1">{note.response}</Text>
              <Text className="text-[9px] text-muted mt-2">{new Date(note.createdAt).toLocaleString()}</Text>
            </TouchableOpacity>
          ))
        )}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
