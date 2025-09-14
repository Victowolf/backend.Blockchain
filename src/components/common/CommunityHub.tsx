import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Clock, ArrowDown, Users } from 'lucide-react';

interface CommunityHubItem {
  id: string;
  title: string;
  category: 'Fund Transfer' | 'Allocation' | 'Budget Item';
  timestamp: string;
  description: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const CommunityHubDialog: React.FC = () => {
  const [items, setItems] = useState<CommunityHubItem[]>([
    {
      id: '1',
      title: 'Funds allocated to Karnataka Health Dept',
      category: 'Allocation',
      timestamp: '2h ago',
      description: '₹20 Cr allocated from National Health Fund to Karnataka Health Department for emergency medical equipment procurement.',
      comments: [
        {
          id: '1',
          author: 'Dr. Priya Sharma',
          content: 'This allocation will greatly help our rural hospitals. Thank you for the transparency!',
          timestamp: '1h ago'
        }
      ]
    },
    {
      id: '2',
      title: 'Funds allocated to CSE Dept',
      category: 'Allocation',
      timestamp: '4h ago',
      description: '₹50 Lakhs moved from Institution Funds to CSE Department for research projects and lab equipment.',
      comments: []
    },
    {
      id: '3',
      title: 'Emergency Medical Fund Transfer',
      category: 'Fund Transfer',
      timestamp: '6h ago',
      description: '₹5 Cr emergency fund transferred to Mumbai Hospital for COVID-19 response and ICU expansion.',
      comments: [
        {
          id: '2',
          author: 'Citizens Collective',
          content: 'Great to see quick response during health emergencies.',
          timestamp: '5h ago'
        },
        {
          id: '3',
          author: 'Health Advocate',
          content: 'Hope these funds are utilized effectively. Will track the progress.',
          timestamp: '4h ago'
        }
      ]
    },
    {
      id: '4',
      title: 'Education Infrastructure Budget',
      category: 'Budget Item',
      timestamp: '8h ago',
      description: '₹15 Cr budget approved for school infrastructure development in rural areas across 5 states.',
      comments: []
    },
    {
      id: '5',
      title: 'Student Scholarship Fund Release',
      category: 'Fund Transfer',
      timestamp: '12h ago',
      description: '₹2 Cr released for merit-based scholarships for underprivileged students in engineering colleges.',
      comments: [
        {
          id: '4',
          author: 'Student Representative',
          content: 'This will help many deserving students pursue their education. Excellent initiative!',
          timestamp: '10h ago'
        }
      ]
    }
  ]);

  const [visibleItems, setVisibleItems] = useState(5);
  const [activeCommentBox, setActiveCommentBox] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fund Transfer':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Allocation':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Budget Item':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const handleCommentSubmit = (itemId: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: commentText,
      timestamp: 'Just now'
    };

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      )
    );

    setCommentText('');
    setActiveCommentBox(null);
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 5);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="hero" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
          <Users className="w-5 h-5 mr-2" />
          Community Hub
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            🏛️ Community Hub
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {items.slice(0, visibleItems).map((item) => (
            <div key={item.id} className="space-y-3 border-b border-border/30 pb-4 last:border-b-0">
              {/* Main Item */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCommentBox(
                    activeCommentBox === item.id ? null : item.id
                  )}
                  className="text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Leave Comment ({item.comments.length})
                </Button>
              </div>

              {/* Comments Section */}
              {item.comments.length > 0 && (
                <div className="ml-4 space-y-2 border-l-2 border-border/30 pl-4">
                  {item.comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              {activeCommentBox === item.id && (
                <div className="ml-4 space-y-2 border-l-2 border-primary/30 pl-4">
                  <Textarea
                    placeholder="Enter your suggestion..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleCommentSubmit(item.id)}
                      disabled={!commentText.trim()}
                    >
                      Post Comment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveCommentBox(null);
                        setCommentText('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>

          {/* Load More Button */}
          {visibleItems < items.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="w-full"
              >
                <ArrowDown className="w-4 h-4 mr-2" />
                Load More
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityHubDialog;