import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Google Drive shareable URL to direct image URL
 */
export const getDriveImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Check if it's already a direct URL
  if (url.includes('drive.google.com/uc')) return url;
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format 1: /d/{fileId}/
  const dMatch = url.match(/\/d\/([^\/]+)/);
  if (dMatch && dMatch[1]) {
    fileId = dMatch[1];
  }
  // Format 2: id={fileId}
  else {
    const idMatch = url.match(/id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }
  
  if (!fileId) return url; // Return original if no pattern matched
  
  return `https://drive.google.com/thumbnail?id=${fileId}`;
};