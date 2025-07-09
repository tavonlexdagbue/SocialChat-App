import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPosts = ({ posts, user, onPostDelete }) => {
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const togglePostExpansion = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postTime.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Posts</h3>
      
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-50" />
          <p>No posts yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const isExpanded = expandedPosts.has(post.id);
            const shouldTruncate = post.content.length > 200;
            const displayContent = shouldTruncate && !isExpanded 
              ? post.content.substring(0, 200) + '...' 
              : post.content;

            return (
              <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{user.name}</h4>
                      <p className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      iconSize={16}
                      onClick={() => onPostDelete(post.id)}
                    />
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {displayContent}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => togglePostExpansion(post.id)}
                      className="text-primary hover:underline text-sm mt-1"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-3">
                    <Image
                      src={post.image}
                      alt="Post image"
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={16} />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="Share" size={16} />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={14} />
                    <span className="text-xs">{post.privacy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentPosts;