// uploadToCloudinary(){
//     this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
//         this.responses = [];
//         this.title = '';
//         form.append('upload_preset', this.cloudinary.config().upload_preset);
//         let tags = 'myphotoalbum';
//         if (this.title) {
//             form.append('context', `photo=${this.title}`);
//             tags = `myphotoalbum,${this.title}`;
//         }
//         form.append('folder', 'angular_sample');
//         form.append('tags', tags);
//         form.append('file', fileItem);
//         fileItem.withCredentials = false;
//         return { fileItem, form };
//     };

//     const upsertResponse = (fileItem: any) => {
//         this.zone.run(() => {
//             const existingId = this.responses.reduce((prev, current, index) => {

//                 if (current.file.name === fileItem.file.name && !current.status) {
//                     return index;
//                 }
//                 return prev;
//             }, -1);
//             if (existingId > -1) {
//                 this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
//             } else {
//                 this.responses.push(fileItem);
//             }
//         });
//     };

//     this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
//         upsertResponse(
//             {
//                 file: item.file,
//                 status,
//                 data: JSON.parse(response)
//             }
//         );

//     }

//     this.uploader.onProgressItem = (fileItem: any, progress: any) => {
//         upsertResponse(
//             {
//                 file: fileItem.file,
//                 progress,
//                 data: {}
//             }
//         );
//     }
// }