import { iNote } from '@/types/iNote';
import { iUser } from '@/types/iUser';
import axios, { AxiosError } from 'axios';

export default async function registerNoteRequest(note: iNote) {
  try {
    const response = await axios.post('/api/noteManagement/note', note);
    return response.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}

export async function getAllNotesRequest(user: iUser) {
  try {
    const response = await axios.get('/api/noteManagement/note', {
      params: {
        route: `/user/${user._id}`,
      },
    });
    return response.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}

export async function deleteNoteRequest(id: string) {
  try {
    const response = await axios.delete('/api/noteManagement/note', {
      params: {
        route: `/${id}`,
      },
    });
    return response.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}
export async function updateNoteRequest(id: string, note: iNote) {
  try {
    const response = await axios.put('/api/noteManagement/note', note, {
      params: {
        route: `/${id}`,
      },
    });
    return response?.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}

export async function generateTitleRequest(content: string) {
  try {
    const response = await axios.post('/api/noteManagement/generate', content, {
      params: {
        route: `/note-title`,
      },
    });
    return response?.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}
