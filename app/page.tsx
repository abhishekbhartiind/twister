'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  tweet: z
    .string()
    .min(1, {
      message: 'Post must be at least 1 character long.',
    })
    .max(280, {
      message: 'Post must be less than 280 characters long.',
    }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tweet: '',
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="foryou" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="password">Following</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <FormField
            control={form.control}
            name="tweet"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="What's Happening?"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Tweet</Button>
        </Form>
        <TabsContent value="foryou">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
