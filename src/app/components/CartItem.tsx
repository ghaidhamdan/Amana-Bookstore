// src/app/components/CartItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Book } from '../types';

interface CartItemProps {
  item: { book: Book; quantity: number };
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { book, quantity } = item;

  // Calculate subtotal
  const subtotal = (book.price * quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-white to-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 mb-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-16 bg-gray-200 flex items-center justify-center rounded-md shadow-inner">
          <div className="text-2xl text-gray-400">📚</div>
        </div>

        <div>
          <Link
            href={`/book/${book.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer"
          >
            {book.title}
          </Link>
          <p className="text-sm text-gray-600">by {book.author}</p>
          <p className="text-md font-bold text-green-700 mt-1">${book.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Quantity Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(book.id, quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            -
          </button>
          <span className="min-w-[24px] text-center font-semibold">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(book.id, quantity + 1)}
            className="px-2 py-1 bg-green-500 text-white border border-green-600 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <p className="text-md font-semibold text-gray-800 w-24 text-right">
          ${subtotal}
        </p>

        {/* Remove Button */}
        <button
          onClick={() => onRemoveItem(book.id)}
          className="text-sm bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-md hover:bg-red-200 transition-colors cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
