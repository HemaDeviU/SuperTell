'use client';

import { Label } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';
import { useReadContract } from 'wagmi';
import PRED_ABI from '@/abi/INEOPRE.abi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { wagmiContractConfig } from '@/lib/contracts';
// 랜덤 지갑 주소를 생성하는 함수
const generateRandomWalletAddress = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};
// 서로 다른 지갑 주소 생성
const walletAddresses = Array.from({ length: 8 }, generateRandomWalletAddress);
// 지갑 주소를 축약하는 함수
const shortenAddress = (address: any) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const GameDetailComment = () => {
  const searchParams = useSearchParams();
  const key = searchParams ? searchParams.get('key') : null;

  const { data: game }: any = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCurrentRound'
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Description</Label>
        <Input id="description" placeholder="Please leave a comment." />
        <Button className="w-200 h-110 cursor-pointer bg-[#00A29A] bg-[rgb(105,227,169)] object-contain text-black transition-transform duration-75 hover:bg-[#00A29A] active:scale-95 active:bg-[#66C2B8]">
          Comment
        </Button>
      </div>
      <div className="ml-5 mr-5 flex space-x-4">
        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
            <div className="grid gap-6">
              {walletAddresses.slice(0, 7).map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/03.png" alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {shortenAddress(address)}
                      </p>
                      <p className="text-sm font-medium leading-none">
                        price will be go up
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
