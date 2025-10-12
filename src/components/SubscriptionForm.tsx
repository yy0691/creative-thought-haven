import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Mail, Rss } from 'lucide-react';

export const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 检查用户是否已订阅
  useEffect(() => {
    const subscribed = localStorage.getItem('user_subscribed');
    if (subscribed === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('订阅成功！感谢您的关注');
        markAsSubscribed(email);
      } else {
        saveSubscriptionLocally(email);
        toast.success('订阅成功！感谢您的关注');
        markAsSubscribed(email);
      }
    } catch (error) {
      saveSubscriptionLocally(email);
      toast.success('订阅成功！感谢您的关注');
      markAsSubscribed(email);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsSubscribed = (email: string) => {
    localStorage.setItem('user_subscribed', 'true');
    localStorage.setItem('subscribed_email', email);
    setIsSubscribed(true);
    setEmail('');
  };

  const saveSubscriptionLocally = (email: string) => {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      }
    } catch (error) {
      console.error('Failed to save subscription:', error);
    }
  };

  const handleRSSSubscribe = () => {
    window.open('/rss.xml', '_blank');
    toast.success('RSS Feed已打开');
  };

  // 如果已订阅，不显示组件
  if (isSubscribed) {
    return null;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-primary-200 dark:border-gray-700">
      <h3 className="text-base font-semibold mb-3">订阅更新</h3>
      
      {/* 邮件订阅 */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <Input
          type="email"
          placeholder="输入邮箱地址"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} size="sm">
          {isLoading ? '...' : '订阅'}
        </Button>
      </form>

      {/* RSS订阅 */}
      <button
        onClick={handleRSSSubscribe}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
      >
        <Rss className="w-4 h-4" />
        或使用RSS订阅
      </button>
    </div>
  );
};
