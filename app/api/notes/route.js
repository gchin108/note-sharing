import {connectToDB} from "@/utils/db";
import noteModel from "@/models/noteModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {

  try {
    await connectToDB();

    const notes = await noteModel.find();
    

    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const POST = async (request) => {
  const { title, content } = await request.json();

  try {
    await connectToDB();
    const newNote = new noteModel({ title: title, content, content });

    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { title, content, _id } = await request.json();
    // console.log(title)
    // console.log(content)
  try {
    await connectToDB();

    // Find the existing note by ID
    const existingNote = await noteModel.findById(_id);

    if (!existingNote) {
      return new Response("Note not found", { status: 404 });
    }

    // Update the note with new data
    existingNote.title = title;
    existingNote.content = content;
    
    await existingNote.save();
    // console.log("changed note: " + existingNote);
    return new Response(JSON.stringify(existingNote), { status: 201 });
  } catch (error) {
    return new Response("Error Updating Note", { status: 500 });
  }
};

//delete, delete by id
export const DELETE = async(request)=>{
    const { _id } = await request.json();
    try{
        await connectToDB();
        const noteToDelete = await noteModel.findByIdAndRemove(_id);
        // console.log("noteToDelete: " + noteToDelete)
        return new Response("Prompt deleted successfully", {status:200})
    }catch(err){
        return new Response("Failed to delete promp", {status:500})
    }
}