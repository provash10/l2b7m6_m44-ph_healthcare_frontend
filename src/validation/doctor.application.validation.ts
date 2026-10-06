export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 *1024;

export function isAcceptedFileSize(fileSize: number){
    return fileSize <= MAX_FILE_SIZE_BYTES;
}