import { NextResponse } from 'next/server';

export async function GET() {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Missing backend URL' }, { status: 500 });
    }

    try {
        const res = await fetch(backendUrl);

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: res.status });
        }

        const data = await res.json();

        console.log('fetchTasks', data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}