"use client";
import * as React from 'react'
import Card from "@/app/ui/collections/card";

interface ListParams {
    params: {
      id: string;
    };
  }
  

export default function List({ params }: ListParams) {
  const { id } = React.use(params);
  return (
    <div> 
        <Card id={id} />
    </div>
  )
}