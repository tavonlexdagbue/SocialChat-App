npm install        //to install all the dependencies on package.json

install supabase register and login
1. Create a Supabase project

    Go to https://supabase.com and sign up or log in.

    Create a new project.

    Get your API URL and anon/public API key from the project settings → API.

2. Install Supabase client in your React frontend

In your React + Vite project directory, run:

npm install @supabase/supabase-js

3. Set up environment variables

Create a .env file in your project root (next to package.json) and add:

VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_API_KEY

Important:

    Prefix environment variables with VITE_ to expose them to Vite.

    Replace with your actual Supabase project URL and anon key.

4. Initialize Supabase client

Create a file like src/utils/supabase.js:

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

5. Use Supabase in React

Example to listen for real-time messages in a chat table:

import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages
    fetchMessages();

    // Subscribe to new messages in real-time
    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(current => [...current, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (!error) setMessages(data);
  }

  // ...render your messages
}

6. Set up your database schema

In Supabase SQL editor or table editor, create a messages table with at least:

    id (UUID or serial primary key)

    content (text)

    user_id (text or UUID)

    created_at (timestamp with timezone, default now())

7. Backend Node (optional)

If you want a Node backend to interact with Supabase (e.g., server-side auth, webhooks), you can install @supabase/supabase-js there too:

npm install @supabase/supabase-js

And initialize similarly using process.env.SUPABASE_URL and process.env.SUPABASE_SERVICE_ROLE_KEY (use service role key for trusted server operations).
Summary

    Install @supabase/supabase-js on frontend (React/Vite) and backend (Node) if needed.

    Set up env variables correctly (VITE_ prefix for Vite).

    Initialize client with createClient().

    Use Supabase client to fetch, insert, and subscribe to real-time data.

    Configure CORS and allowed origins in Supabase project settings to match your frontend URL.
    
npm run build     //this is to run build

npm start        //  this is to start 
i
http://localhost:4028/

user-registration
user-profile-management
user-login
real-time-chat-interface
media-gallery-and-viewer
friend-discovery-and-management
