import api from "../axiosClinet";

const endPoint = {
  BASE: "/streams",
};

export async function getStreams(page = 1, limit = 10) {
  const res = await api.get(endPoint.BASE, {
    params: { page, limit },
  });

  return res.data;
}

export async function postStreams(body: any) {
  const res = await api.post(endPoint.BASE, body);
  return res.data;
}

export async function deleteStream(id: string) {
  const res = await api.delete(`${endPoint.BASE}/${id}`);
  return res.data;
}

export async function editStream(body: any) {
  const res = await api.put(`${endPoint.BASE}/${body.id!}`, body.data!);
  return res.data;
}
