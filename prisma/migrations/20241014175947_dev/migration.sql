-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "wallet" TEXT NOT NULL,
    "referral" TEXT NOT NULL DEFAULT '',
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT DEFAULT '',
    "email" TEXT DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pait_tokens" INTEGER NOT NULL DEFAULT 0,
    "usdc_amount" INTEGER NOT NULL DEFAULT 0,
    "used_referral" TEXT DEFAULT '',
    "signed_document_url" TEXT DEFAULT '',
    "uploud_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',
    "file_type" TEXT NOT NULL DEFAULT 'pdf',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_uploud_id_fkey" FOREIGN KEY ("uploud_id") REFERENCES "UploadFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
