import { apiFetch } from "./client";

type UpdateAvatarData = {
  avatar: {
    url: string;
    alt: string;
  };
};

export function updateAvatar(name: string, data: UpdateAvatarData) {
  return apiFetch(`/holidaze/profiles/${name}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
