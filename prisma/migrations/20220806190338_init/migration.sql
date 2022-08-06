-- CreateTable
CREATE TABLE "ShortLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(1000) NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);
