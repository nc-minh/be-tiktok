import fs from 'fs';
import randomstring from 'randomstring';

import { cloudinary_v2 } from 'resources/cloudinary';

export class Cloudinary {
  public async uploads(file: any, type?: string): Promise<any> {
    try {
      const random_id = randomstring.generate();

      if (file === undefined) return;

      const fileName = file.name;

      const uploadPath = __dirname + '/tmp/' + fileName;

      await file.mv(uploadPath);

      /**
       *  Resource_type defaults: image for server-side uploading and auto for client-side uploading.
       *  Valid values: image, raw, video and auto.
       */

      const fileNameOnCloudinary = `${fileName}-${random_id}`;

      const images_options = {
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        public_id: `tiktok/images/${fileNameOnCloudinary}`,
      };

      const videos_options = {
        resource_type: 'video',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        chunk_size: 6000000,
        public_id: `tiktok/videos/${fileNameOnCloudinary}`,
      };

      const options = type === 'video' ? videos_options : images_options;

      const result = await cloudinary_v2.uploader.upload(uploadPath, options);

      await fs.unlinkSync(uploadPath);

      return result;
    } catch (error) {
      return error;
    }
  }
}
