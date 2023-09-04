import { importResource } from '../../application/helpers/common-functions';

importResource({
	style: `https://fonts.googleapis.com/css?family=Poppins:300,300i,500,500i,700,700i,900,900i|Roboto:300,400,500,600,700,900&display=swap`,
	id: 'google-fonts',
	async: true,
});

importResource({
	style: `https://viewinmobiliario2.s3-sa-east-1.amazonaws.com/static_assets/utils/all.min.gz.css`,
	id: 'fontawesome',
	async: true,
});
