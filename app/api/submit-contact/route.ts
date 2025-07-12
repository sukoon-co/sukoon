import { NextRequest, NextResponse } from 'next/server'
import { saveToGoogleSheets, FormData } from '@/lib/google-sheets'

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await saveToGoogleSheets(data)
    
    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}