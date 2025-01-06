import {Client, ID, Databases, Storage, Query} from "appwrite"

const appwriteProjectId = import.meta.env.VITE_APPRWRITE_PROJECT_ID
const appwriteDatabaseId = import.meta.env.VITE_APPRWRITE_DATABASE_ID
const appwriteBucketId = import.meta.env.VITE_APPRWRITE_BUCKET_ID 
const appwriteCollectionId = import.meta.env.VITE_APPRWRITE_COLLECTION_ID
const appwriteUrl = "https://cloud.appwrite.io/v1"


export class Service {
    client = new Client();
    databases;
    bucket;
    constructor(){
        
        this.client
        .setEndpoint(appwriteUrl)
        .setProject(appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    async addDogInfo({dogName, lifeSpan, origin, behaviour, addedBy, image})  {
        const imageUploadInfo = await this.uploadFile(image[0])
        const imageId = imageUploadInfo.$id
        console.log(imageId)
        try {
            return await this.databases.createDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                dogName,
                {
                    dogName,
                    lifeSpan,
                    origin,
                    behaviour,
                    addedBy,
                    imageId
                }
            )
        } catch (error) {
            console.log(error)
        }
    }


    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error while getting post")
        }
    }

    async getDogs(search){
        try {
            const searchData =  await this.databases.listDocuments(
                appwriteDatabaseId,
                appwriteCollectionId,
                [
                    Query.startsWith("dogName", search)
                ]
            )
            console.log(searchData.documents[0])
            return searchData.documents[0]
        } catch (error) {
            console.log(error.message)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Error while uploding file")
        }
    }



    getFilePreview(fileId){
        console.log(fileId)
        try {
            return this.bucket.getFilePreview(
                appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    async downloadFile(fileId){
        try {
            return await this.bucket.downloadFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error while downloading file")
        }
    }

}


const service = new Service();

export default service;