import type { RequestHandler } from '../../../.svelte-kit/types/src/routes/todos/__types';
import puppeteer from 'puppeteer';

export const get: RequestHandler = async ({ url }) => {
	let image = null;
	// @ts-ignore
	const website = url.searchParams.get('website');
	// @ts-ignore
	const height = url.searchParams.get('height');
	// @ts-ignore
	const width = url.searchParams.get('width');
	// @ts-ignore
	const fullPage = url.searchParams.get('fullPage');

	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox"]
	});
	const page = await browser.newPage();
	// @ts-ignore
	await page.goto(website);
	// @ts-ignore
	await page.setViewport({ width: parseInt(width), height: parseInt(height) });
	// @ts-ignore
	image = await page.screenshot({ fullPage: fullPage === 'true' ? true : false });

	await browser.close();
	return {
		headers: {
			'Content-Type': 'image/png'
		},
		body: image
	};
};
