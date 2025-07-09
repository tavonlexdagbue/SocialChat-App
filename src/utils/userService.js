import { supabase } from './supabase';

class UserService {
  // Get all users for friend discovery
  async getUsers(limit = 20, offset = 0) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, full_name, username, avatar_url, bio, is_online, last_seen')
        .eq('profile_visibility', true)
        .neq('id', currentUserId)
        .range(offset, offset + limit - 1);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load users' };
    }
  }

  // Search users by name or username
  async searchUsers(query, limit = 20) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, full_name, username, avatar_url, bio, is_online, last_seen')
        .or(`full_name.ilike.%${query}%,username.ilike.%${query}%`)
        .eq('profile_visibility', true)
        .neq('id', currentUserId)
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to search users' };
    }
  }

  // Get user profile by ID
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load user profile' };
    }
  }

  // Get user's friends
  async getFriends(userId) {
    try {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester:user_profiles!friendships_requester_id_fkey(id, full_name, username, avatar_url, is_online, last_seen),
          addressee:user_profiles!friendships_addressee_id_fkey(id, full_name, username, avatar_url, is_online, last_seen)
        `)
        .eq('status', 'accepted')
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

      if (error) {
        return { success: false, error: error.message };
      }

      // Transform the data to return the friend info (not the current user)
      const friends = data?.map(friendship => {
        const friend = friendship.requester_id === userId 
          ? friendship.addressee 
          : friendship.requester;
        return {
          ...friend,
          friendship_id: friendship.id,
          created_at: friendship.created_at
        };
      });

      return { success: true, data: friends };
    } catch (error) {
      return { success: false, error: 'Failed to load friends' };
    }
  }

  // Send friend request
  async sendFriendRequest(addresseeId) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id;

      if (!currentUserId) {
        return { success: false, error: 'Not authenticated' };
      }

      // Check if friendship already exists
      const { data: existingFriendship } = await supabase
        .from('friendships')
        .select('*')
        .or(`
          and(requester_id.eq.${currentUserId},addressee_id.eq.${addresseeId}),
          and(requester_id.eq.${addresseeId},addressee_id.eq.${currentUserId})
        `)
        .single();

      if (existingFriendship) {
        return { success: false, error: 'Friend request already exists' };
      }

      const { data, error } = await supabase
        .from('friendships')
        .insert({
          requester_id: currentUserId,
          addressee_id: addresseeId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to send friend request' };
    }
  }

  // Accept friend request
  async acceptFriendRequest(friendshipId) {
    try {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('id', friendshipId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to accept friend request' };
    }
  }

  // Reject friend request
  async rejectFriendRequest(friendshipId) {
    try {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'rejected' })
        .eq('id', friendshipId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to reject friend request' };
    }
  }

  // Get pending friend requests
  async getPendingFriendRequests(userId) {
    try {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester:user_profiles!friendships_requester_id_fkey(id, full_name, username, avatar_url, is_online, last_seen)
        `)
        .eq('addressee_id', userId)
        .eq('status', 'pending');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load friend requests' };
    }
  }

  // Update user online status
  async updateOnlineStatus(userId, isOnline) {
    try {
      const updates = {
        is_online: isOnline,
        last_seen: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update online status' };
    }
  }
}

export default new UserService();