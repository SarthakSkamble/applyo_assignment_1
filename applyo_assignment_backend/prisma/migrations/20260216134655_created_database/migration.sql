-- CreateTable
CREATE TABLE "Poll" (
    "poll_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("poll_id")
);

-- CreateTable
CREATE TABLE "Option" (
    "option_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "poll_id" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "vote_id" SERIAL NOT NULL,
    "poll_id" TEXT NOT NULL,
    "option_id" INTEGER NOT NULL,
    "voterToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("vote_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_poll_id_voterToken_key" ON "Vote"("poll_id", "voterToken");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;
