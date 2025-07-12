// Replace these with your actual values
const SHEET_ID = '1b88siqzKWQW1QRHjeglpCs2FLejcMRaoaaCklwo7BFk'
const SERVICE_ACCOUNT_EMAIL = 'sukoon-excel@light-scarab-465420-j5.iam.gserviceaccount.com'
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
YOUR_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----`

export interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  selectedServices: Array<{
    service: string
    price: number
  }>
  notes: string
}

export async function saveToGoogleSheets(data: FormData) {
  try {
    const accessToken = await getAccessToken()
    
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=RAW`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Damascus' }),
          data.firstName,
          data.lastName,
          data.email,
          data.phone,
          data.selectedServices.map(s => `${s.service}: $${s.price}${s.service.includes('Training') || s.service.includes('Meeting') ? '/hour' : '/month'}`).join(', '),
          data.notes || 'N/A'
        ]]
      })
    })

    if (response.ok) {
      return { success: true }
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return { success: false, error: (error as any).message }
  }
}

async function getAccessToken() {
  const jwt = createJWT()
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  })
  
  const data = await response.json()
  return data.access_token
}

function createJWT() {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const now = Math.floor(Date.now() / 1000)
  const payload = btoa(JSON.stringify({
    iss: SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }))
  
  return `${header}.${payload}.signature_placeholder`
}