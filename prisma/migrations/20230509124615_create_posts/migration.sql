-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_title_key" ON "Posts"("title");
