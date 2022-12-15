import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Axios */
    axios,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name
      }
      if (payload.email) {
        this.userEmail = payload.email
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar
      }
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data
          }
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
})

// const token =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjYwODBlMDRlNjdmYjEwMDc1MWY3NTFlNjBhYzJjZDUwMWNmZDk2OGFkYWJjM2UxYTM1OTM2NDE2MzU1OGM5NGFhNmIzYTVmNmI0MDc4MTEiLCJpYXQiOjE2NzExMDQwODMuMjI5ODY1LCJuYmYiOjE2NzExMDQwODMuMjI5ODcsImV4cCI6MTcwMjY0MDA4My4yMDgwNzYsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.rWZbm2VPhBlfjxEJD310se-QKW-HCyFcE3kphsHx6UVJPr8XBfYxnN_s5mHqhqP--0V0WUl0O71nTCE-t05s2RQPJvra9MZIj_niwe8Ns64WFMgkx06sFBISTJIF1vEmSgtHHzGjWtb9dlDg_UZ4izanCD3SqQsZW_6b8mQGzZpIhh3pe55Oht4qn3efevzi9N1NsrNNRg5g7hctcd4qWjMWTouG7-DI87utAM5wToX922HajfzgWE3wslsn21jmgMHKha9zErJTKwTsCYqNK8qXiCqR15Yxc9bEOpzXxuWBF4DTdDKkQZErJy1Jt60YH_KR_h5Dj4QMcypipk-30iVYBDfS6d1iOJVbCtZjJZnDrDANu54-CI927Dah1OR2Eje2jauuQAITssZEkiwAUU8ikwlAchIZHsRoU9mumdOrtYlNjsNC_XGbnsOiw3raqzHhZVoLz0c8qbvif67lQaJyQvoLENsxIvfoxtc9ysrl3ihpeEImIJqkk7rUjkcVu5lKyWkyPLRO_7T3kcpT2BcmaZ6ByXCDZMSz7r9VB4BmXB49NoiAxcaubKam0siz7rQlOPNFpWfFI1vZavP_-qVc1nhZaRbkgUVV6nYe9Wg1WgCl9QsmTlAhrq8T5F53UmgVCsxSfvenN8v2PlMCGRIXB1CjtDyFx34Wy_7DIbs'

// axios
//   .get('http://fastuga-api.test/api/customers', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   .then((r) => {
//     console.log(r.data.data)
//   })
