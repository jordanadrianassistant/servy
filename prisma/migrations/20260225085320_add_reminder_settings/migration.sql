-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'America/Costa_Rica',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "locale" TEXT NOT NULL DEFAULT 'es',
    "whatsappConnected" BOOLEAN NOT NULL DEFAULT false,
    "whatsappSessionId" TEXT,
    "calendarConnected" BOOLEAN NOT NULL DEFAULT false,
    "calendarAccessToken" TEXT,
    "calendarRefreshToken" TEXT,
    "calendarId" TEXT,
    "aiGreeting" TEXT,
    "aiInstructions" TEXT,
    "aiTone" TEXT NOT NULL DEFAULT 'professional',
    "reminder24h" BOOLEAN NOT NULL DEFAULT true,
    "reminder1h" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Business" ("address", "aiGreeting", "aiInstructions", "aiTone", "calendarAccessToken", "calendarConnected", "calendarId", "calendarRefreshToken", "createdAt", "currency", "description", "id", "locale", "name", "phone", "timezone", "updatedAt", "userId", "whatsappConnected", "whatsappSessionId") SELECT "address", "aiGreeting", "aiInstructions", "aiTone", "calendarAccessToken", "calendarConnected", "calendarId", "calendarRefreshToken", "createdAt", "currency", "description", "id", "locale", "name", "phone", "timezone", "updatedAt", "userId", "whatsappConnected", "whatsappSessionId" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
CREATE UNIQUE INDEX "Business_userId_key" ON "Business"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
