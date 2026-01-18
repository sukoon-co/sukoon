import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDriveImageUrl } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { Copy } from "lucide-react";

interface PersonCardProps {
  name: string;
  title: string;
  category: string[];
  email?: string;
  phoneNumber?: string;
  linkPortfolio?: string;
  addedDate?: string;
  image?: string;
}

export default function PersonCard({
  name,
  title,
  category,
  email,
  phoneNumber,
  linkPortfolio,
  addedDate,
  image,
}: PersonCardProps) {
  const { t } = useI18n();
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  // Get processed image URL
  const imageUrl = image ? getDriveImageUrl(image) : "/placeholder-user.jpg";
  
  return (
    <Card className="rounded-2xl border border-muted bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-full ring-2 ring-muted overflow-hidden bg-muted">
            <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{title}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {category.map((cat, index) => (
            <Badge key={index} variant="secondary" className="rounded-md">
              {cat.trim()}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="space-y-2 text-sm">
          {email && (
            <div className="flex justify-between text-muted-foreground">
              <span>{t('community.personCard.email')}:</span>
              <div className="flex items-center gap-1">
                <a href={`mailto:${email}`} className="text-primary font-medium hover:underline">{email}</a>
                <button onClick={() => copyToClipboard(email)} className="p-1 hover:bg-muted rounded">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {phoneNumber && (
            <div className="flex justify-between text-muted-foreground">
              <span>{t('community.personCard.phoneNumber')}:</span>
              <div className="flex items-center gap-1">
                <a href={`tel:${phoneNumber}`} className="text-primary font-medium hover:underline">{phoneNumber}</a>
                <button onClick={() => copyToClipboard(phoneNumber)} className="p-1 hover:bg-muted rounded">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {linkPortfolio && (
            <div className="flex justify-between text-muted-foreground">
              <span>{t('community.personCard.portfolio')}:</span>
              <div className="flex items-center gap-1 min-w-0">
                <a href={linkPortfolio} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline truncate max-w-32">{linkPortfolio}</a>
                <button onClick={() => copyToClipboard(linkPortfolio)} className="p-1 hover:bg-muted rounded flex-shrink-0">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {addedDate && (
            <div className="flex justify-between text-muted-foreground">
              <span>{t('community.personCard.joining')}:</span>
              <span className="text-foreground font-medium">{formatDate(addedDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
