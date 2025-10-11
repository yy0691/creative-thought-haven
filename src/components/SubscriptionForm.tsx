import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Subscribing...');

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Success! Check your email to confirm.');
      setEmail('');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="p-6 bg-muted/50 dark:bg-muted/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Subscribe for Updates</h3>
      <p className="text-sm text-muted-foreground mb-4">Get the latest articles and news delivered to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit">Subscribe</Button>
      </form>
      {message && <p className="text-sm mt-2 text-muted-foreground">{message}</p>}
    </div>
  );
};
