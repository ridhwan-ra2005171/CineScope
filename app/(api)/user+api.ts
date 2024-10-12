/* eslint-disable prettier/prettier */
import { neon } from "@neondatabase/serverless";

//this sql neon is needed everytime u make a request
// const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`); //from env file

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`); //from env file
    console.log(process.env.DATABASE_URL);
    
    const { name, email, clerkId } = await request.json();

    //if no access to email/name/clerkId
    if (!name || !email || !clerkId) {
      return Response.json("Name, email, and clerkId are required", {
        status: 400,
      });
    }

    //if available run the sql syntax
    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId}
     );`;

     return new Response(JSON.stringify({ data: response }), {
        status: 201,
      });
  } catch (err) {
    console.error("Error creating user:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information

//NOTE in lib, i made a helper function to ease fetch calls