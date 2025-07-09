import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';
import GroupMembersList from './components/GroupMembersList';
import MessageSearch from './components/MessageSearch';
import ImageViewer from './components/ImageViewer';

const RealTimeChatInterface = () => {
  const { conversationId } = useParams();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [imageViewerData, setImageViewerData] = useState({
    isVisible: false,
    images: [],
    currentIndex: 0
  });

  // Mock data
  const mockConversations = {
    '1': {
      id: '1',
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face",
      isGroupChat: false,
      memberCount: 2,
      lastSeen: "2 hours ago"
    },
    '2': {
      id: '2',
      name: "Design Team",
      avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=150&h=150&fit=crop",
      isGroupChat: true,
      memberCount: 8,
      lastSeen: null
    }
  };

  const mockMessages = [
    {
      id: '1',
      type: 'text',
      content: "Hey! How\'s the project coming along?",
      sender: {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      reactions: [{ emoji: '👍', count: 2 }]
    },
    {
      id: '2',
      type: 'text',
      content: "It\'s going well! Just finished the wireframes. Want to take a look?",
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(Date.now() - 3500000),
      status: 'read'
    },
    {
      id: '3',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop',
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(Date.now() - 3400000),
      status: 'delivered'
    },
    {
      id: '4',
      type: 'text',
      content: "Looks great! I love the color scheme you chose.",
      sender: {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 3200000),
      status: 'read',
      replyTo: {
        id: '3',
        sender: 'You',
        content: 'Image'
      }
    },
    {
      id: '5',
      type: 'voice',
      content: 'voice_message_url',
      duration: '0:45',
      sender: {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 1800000),
      status: 'read'
    },
    {
      id: '6',
      type: 'file',
      content: 'document_url',
      fileName: 'Project_Requirements.pdf',
      fileSize: '2.4 MB',
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(Date.now() - 900000),
      status: 'sent'
    }
  ];

  const mockGroupMembers = [
    {
      id: 'current-user',
      name: 'You',
      avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      isAdmin: true,
      isOnline: true,
      lastSeen: null
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face',
      isAdmin: false,
      isOnline: true,
      lastSeen: null
    },
    {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150&h=150&fit=crop&crop=face',
      isAdmin: false,
      isOnline: false,
      lastSeen: '1 hour ago'
    },
    {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
      isAdmin: false,
      isOnline: true,
      lastSeen: null
    }
  ];

  const mockTypingUsers = [
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a0b8e0?w=150&h=150&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    // Initialize conversation and messages
    const currentConversation = mockConversations[conversationId || '1'];
    setConversation(currentConversation);
    setMessages(mockMessages);

    // Simulate typing indicator
    const typingTimer = setTimeout(() => {
      setTypingUsers(mockTypingUsers);
      setTimeout(() => setTypingUsers([]), 3000);
    }, 2000);

    return () => clearTimeout(typingTimer);
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setReplyTo(null);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: Date.now().toString(),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      content: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, fileMessage]);
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleReply = (message) => {
    setReplyTo({
      id: message.id,
      sender: message.sender.name,
      content: message.type === 'text' ? message.content : message.type
    });
  };

  const handleImageClick = (imageSrc) => {
    const imageMessages = messages.filter(msg => msg.type === 'image');
    const currentIndex = imageMessages.findIndex(msg => msg.content === imageSrc);
    
    setImageViewerData({
      isVisible: true,
      images: imageMessages.map(msg => ({
        src: msg.content,
        sender: msg.sender.name,
        timestamp: msg.timestamp
      })),
      currentIndex: Math.max(0, currentIndex)
    });
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate voice message creation
    const voiceMessage = {
      id: Date.now().toString(),
      type: 'voice',
      content: 'voice_message_url',
      duration: '0:03',
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      },
      timestamp: new Date(),
      status: 'sent'
    };
    setMessages(prev => [...prev, voiceMessage]);
  };

  const handleRemoveMember = (memberId) => {
    console.log('Remove member:', memberId);
  };

  const handleMakeAdmin = (memberId) => {
    console.log('Make admin:', memberId);
  };

  const handleAddMembers = () => {
    console.log('Add members');
  };

  const handleMessageSelect = (message) => {
    // Scroll to message
    const messageElement = document.getElementById(`message-${message.id}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageElement.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
      setTimeout(() => {
        messageElement.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
      }, 2000);
    }
  };

  const shouldShowAvatar = (message, index) => {
    if (index === messages.length - 1) return true;
    const nextMessage = messages[index + 1];
    return nextMessage.sender.id !== message.sender.id;
  };

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-onBackground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <ChatHeader
        conversation={conversation}
        isGroupChat={conversation.isGroupChat}
        onlineStatus={!conversation.isGroupChat}
        onSettingsClick={() => setShowSearch(!showSearch)}
        onVideoCall={() => console.log('Video call')}
        onVoiceCall={() => console.log('Voice call')}
      />

      {/* Group Members List */}
      {conversation.isGroupChat && (
        <GroupMembersList
          members={mockGroupMembers}
          isAdmin={true}
          onRemoveMember={handleRemoveMember}
          onMakeAdmin={handleMakeAdmin}
          onAddMembers={handleAddMembers}
          isVisible={showMembersList}
          onToggle={() => setShowMembersList(!showMembersList)}
        />
      )}

      {/* Message Search */}
      <MessageSearch
        messages={messages}
        isVisible={showSearch}
        onClose={() => setShowSearch(false)}
        onMessageSelect={handleMessageSelect}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div key={message.id} id={`message-${message.id}`} className="transition-colors duration-500">
            <MessageBubble
              message={message}
              isOwn={message.sender.id === 'current-user'}
              showAvatar={shouldShowAvatar(message, index)}
              onReact={handleReaction}
              onReply={() => handleReply(message)}
              onImageClick={handleImageClick}
            />
          </div>
        ))}
        
        {/* Typing Indicator */}
        <TypingIndicator typingUsers={typingUsers} />
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />

      {/* Image Viewer */}
      <ImageViewer
        images={imageViewerData.images}
        currentIndex={imageViewerData.currentIndex}
        isVisible={imageViewerData.isVisible}
        onClose={() => setImageViewerData(prev => ({ ...prev, isVisible: false }))}
        onPrevious={() => setImageViewerData(prev => ({
          ...prev,
          currentIndex: Math.max(0, prev.currentIndex - 1)
        }))}
        onNext={() => setImageViewerData(prev => ({
          ...prev,
          currentIndex: Math.min(prev.images.length - 1, prev.currentIndex + 1)
        }))}
      />
    </div>
  );
};

export default RealTimeChatInterface;