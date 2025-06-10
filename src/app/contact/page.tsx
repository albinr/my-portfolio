"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submit
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 sm:py-32 font-sans">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
          Contact Me
        </h1>
        <p className="text-lg text-center mb-10">
          Have a question, idea, or project? Let’s talk.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-full "
              />
            </div>
            <div>
              <label className="block mb-2 font-medium ">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-full "
              />
            </div>
            <div>
              <label className="block mb-2 font-medium ">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-3xl "
              ></textarea>
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Thanks for your message!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              I’ll get back to you as soon as I can.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
