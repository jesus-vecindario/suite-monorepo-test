export const MIME_TYPE = 'image/png';

export const canvasToFile = (b64Data, mimeType = MIME_TYPE) => {
	const blobBin = atob(b64Data.split(',')[1]);
	const array = [];
	for (let i = 0; i < blobBin.length; i++) {
		array.push(blobBin.charCodeAt(i));
	}
	const file = new Blob([new window.Uint8Array(array)], { type: mimeType });
	return file;
};
