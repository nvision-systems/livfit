import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, User as UserIcon, MessageSquare, Info } from 'lucide-react-native';
import { getChatHistory, sendMessage, getUser, requestDieticianConnection } from '@livfit/lib';
import { commonStyles } from '../../../styles';

export default function ChatScreen() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const u = await getUser();
    setUser(u);
    if (u.isConnectedToDietician) {
      const history = await getChatHistory();
      setMessages(history);
    }
  };

  const handleConnect = async () => {
    setIsRequesting(true);
    await requestDieticianConnection();
    const u = await getUser();
    setUser(u);
    setIsRequesting(false);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const msgText = newMessage.trim();
    setNewMessage('');
    
    await sendMessage(msgText);
    const updatedHistory = await getChatHistory();
    setMessages(updatedHistory);
  };

  if (user && !user.isConnectedToDietician) {
    return (
      <View style={[commonStyles.centeredContainer, { backgroundColor: '#FFFFFF' }]}>
        <View style={localStyles.lockCircle}>
          <UserIcon size={40} color="#2D5AF0" />
        </View>
        <Text style={localStyles.lockTitle}>Clinical Support</Text>
        <Text style={localStyles.lockSubtitle}>
          Connect with a clinical dietician to receive personalized meal plans and health monitoring.
        </Text>
        <TouchableOpacity 
          style={localStyles.connectButton} 
          onPress={handleConnect}
          disabled={isRequesting}
        >
          <Text style={localStyles.connectButtonText}>
            {isRequesting ? 'Requesting...' : 'Connect to Dietician'}
          </Text>
        </TouchableOpacity>
        <Text style={localStyles.lockNote}>
          Subject to admin approval and dietician assignment.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={localStyles.container}>
        <View style={localStyles.chatHeader}>
          <View style={localStyles.dieticianInfo}>
            <View style={localStyles.avatar}>
              <UserIcon size={16} color="#2D5AF0" />
            </View>
            <View>
              <Text style={localStyles.dieticianName}>Dr. Aris (Clinical Specialist)</Text>
              <Text style={localStyles.dieticianStatus}>Online • Immutable Audit Trail Active</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={[
              localStyles.messageWrapper, 
              item.sender === 'User' ? localStyles.userWrapper : localStyles.dieticianWrapper
            ]}>
              <View style={[
                localStyles.messageBubble, 
                item.sender === 'User' ? localStyles.userBubble : localStyles.dieticianBubble
              ]}>
                <Text style={[
                  localStyles.messageText, 
                  item.sender === 'User' ? localStyles.userText : localStyles.dieticianText
                ]}>
                  {item.message}
                </Text>
              </View>
              <Text style={localStyles.timestamp}>
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          )}
        />

        <View style={localStyles.inputArea}>
          <TextInput
            style={localStyles.textInput}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            style={[localStyles.sendButton, !newMessage.trim() && localStyles.sendDisabled]} 
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  lockCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  lockSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
    marginBottom: 32,
  },
  connectButton: {
    backgroundColor: '#2D5AF0',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  lockNote: {
    fontSize: 12,
    color: '#C7C7CC',
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chatHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  dieticianInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dieticianName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  dieticianStatus: {
    fontSize: 11,
    color: '#34C759',
    fontWeight: '600',
    marginTop: 2,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  dieticianWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#2D5AF0',
    borderBottomRightRadius: 4,
  },
  dieticianBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  dieticianText: {
    color: '#1C1C1E',
  },
  timestamp: {
    fontSize: 10,
    color: '#C7C7CC',
    marginTop: 4,
    fontWeight: '600',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D5AF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    backgroundColor: '#E5E5EA',
  }
});
