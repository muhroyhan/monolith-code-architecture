import axios, { type ResponseType } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const get = <T>(url: string, params?: object, responseType?: ResponseType) =>
  axiosInstance.get<T>(url, {
    params,
    responseType,
  })

export const post = <T>(url: string, data?: object) => axiosInstance.post<T>(url, data)

export const getFile = (url: string, params?: object) =>
  axiosInstance.get(url, {
    params,
    responseType: 'blob',
  })

export const postFile = (url: string, data?: object) => axiosInstance.post(url, data)

export const put = <T>(url: string, data?: object) => {
  return axiosInstance.put<T>(url, data)
}

export const patch = <T>(url: string, data?: object) => axiosInstance.patch<T>(url, data)

export const del = (url: string, params?: object) => axiosInstance.delete(url, { params })
