import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    BlobSASPermissions,
    BlobServiceClient,
    BlockBlobClient,
    ContainerClient,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential
} from '@azure/storage-blob';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class AzureBlobService implements OnModuleInit {
    private blobServiceClient: BlobServiceClient;

    //product-images 컨테이너 접근을 위한 변수
    private publicContainer: ContainerClient;

    onModuleInit() {
        const connectionString = process.env.AZURE_STORAGE_CONNETION_STRING;
        if (!connectionString)
            throw new Error(`.env에 AZURE_STORAGE_CONNETION_STRING 을 넣으세요.`);

        // 업로드 클라이언트를 만들어요 
        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const publicName = process.env.AZURE_PUBLIC_CONTAINER ?? "product-images";
        // 컨테이너를 연결
        this.publicContainer = this.blobServiceClient.getContainerClient(publicName);
    }

    // 저장용 고유 파일명 
    makeBlobName(originName: string) {
        const ext = extname(originName).toLowerCase();
        return `${randomUUID()}${ext}`;
    }

    // product-images 안에 products 가상폴더를 만들고 file 을 업로드 
    async uploadPublic(
        file: Express.Multer.File,
        folder = "products"
    ): Promise<{blobName: string, url: string}> {
        //azure 에 file을 저장하는 로직
        //proeucts/ 가상폴더
        const blobName = `${folder}/${this.makeBlobName(file.originalname)}`;
        const blobBlob = this.publicContainer.getBlockBlobClient(blobName);
        await blobBlob.uploadData(file.buffer,  {
            blobHTTPHeaders: {blobContentType: file.mimetype}
        });

        return {blobName: blobName, url: blobBlob.url }
    }

}
