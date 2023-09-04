import React from 'react';
import EmbededScheduler from '../../presentation/components/Integration/EmbededScheduler';

export const COMMENTS_STEP1_SCHEDULER = [
	'<!--',
	'Incrusta el código en la vista del proyecto dentro de un contenedor teniendo en cuenta las siguientes recomendaciones.',
	'Se recomienda que el contenedor tenga el 100% del ancho de la página.',
	'Se recomienda que no se usen media queries para modificar el tamaño del div.',
	'Se recomienda que no se apliquen estilos CSS al div.',
	'-->',
];

export const COMMENTS_STEP2_SCHEDULER = [
	'<!--',
	'Incrusta el siguiente código justo antes del cierre de la etiqueta </body>.',
	'-->',
];

export const integrations = [
	{
		titleText: 'Obtener código para incrustar',
		descriptionText: (
			<>
				Esta integración permite incrustar un agendador en tu sitio web, el cual va a tener todo el inventario de inmuebles
				disponible para que puedas generar oportunidades más calificadas. <b>Gratis</b>
			</>
		),
		buttonVariant: '-blue-to-red-gradient',
		buttonText: 'Ver pasos',
		component: <EmbededScheduler commentsStep1={COMMENTS_STEP1_SCHEDULER} commentsStep2={COMMENTS_STEP2_SCHEDULER} />,
		icon: <i className="ri-window-fill"></i>,
	},
	{
		titleText: 'Hubpsot',
		imageUrl: 'https://scheduler-spa.s3.us-east-2.amazonaws.com/integrations/hubspot-logo.png',
		descriptionText:
			'Esta integración permite entregar todas las oportunidades generadas por simula en el CRM y herramientas comerciales de Hubspot, por ejemplo: creación de negocios en el Pipeline de ventas, creación de usuarios, entre otros. Requiere membresía PRO en Hubspot',
	},
];

export default integrations;
