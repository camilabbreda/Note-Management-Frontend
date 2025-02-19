import webserver from '@/server/web-servers';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function noteManagementWebserver(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: unknown }>
) {
  try {
    if (!req.query.endpoint) throw new Error('Endpoint is not defined.');
    const { method } = req;
    const { endpoint, token, route } = req.query;

    let response: AxiosResponse;
    if (token) webserver.token = token as string;

    switch (method) {
      case 'GET':
        response = await webserver.notasManagementApi.get(
          `/${endpoint}${route ?? ''}`,
          { params: req.query }
        );
        break;
      case 'POST':
        response = await webserver.notasManagementApi.post(
          `/${endpoint}${route ?? ''}`,
          req.body
        );
        break;
      case 'PUT':
        response = await webserver.notasManagementApi.put(
          `/${endpoint}${route ?? ''}`,
          req.body
        );
        break;
      case 'DELETE':
        response = await webserver.notasManagementApi.delete(
          `/${endpoint}${route ?? ''}`
        );

        break;
      default:
        throw new Error('Method is not registered.');
    }
    const success = true;
    const message = response.data.response;
    if (route === '/login') webserver.token = message?.token;
    return res.status(response.status).json({ success, message });
  } catch (error: unknown) {
    const success = false;
    let status = 500;
    let message = 'An error has occurred, try again later.';

    if (typeof error === 'object' && error !== null) {
      if (
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null
      ) {
        status = (error.response as { status?: number }).status ?? 500;
        message =
          ((error.response as { data?: unknown }).data as string) ?? message;
      } else if ('message' in error) {
        message = String(error.message);
      }
    }
    return res.status(status).json({ success, message });
  }
}
