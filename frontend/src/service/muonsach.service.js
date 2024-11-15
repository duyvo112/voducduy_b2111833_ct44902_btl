import apiService from './api.service'
class apiServiceMuonSach {
  // Đọc giả
  docGiaLogin = data => {
    return apiService.post('docgia/login', data)
  }
  getDocGia = () => {
    return apiService.get('docgia')
  }
  registerDocGia = data => {
    return apiService.post('docgia/register', data)
  }
  updateDocGia = data => {
    return apiService.put(`docgia/${data._id}`, data)
  }
  deleteDocGia = id => {
    return apiService.delete(`docgia/${id}`)
  }
  // Nhân viên
  nhanVienLogin = data => {
    return apiService.post('nhanvien/login', data)
  }
  getNhanVien = () => {
    return apiService.get('nhanvien')
  }
  addNhanVien = data => {
    return apiService.post('nhanvien/register', data)
  }
  updateNhanVien = (id, data) => {
    return apiService.put(`nhanvien/${id}`, data)
  }
  deleteNhanVien = id => {
    return apiService.delete(`nhanvien/${id}`)
  }
  // Nhà xuất bản
  getNhaXuatBan = () => {
    return apiService.get('nhaxuatban')
  }
  addNhaXuatBan = data => {
    return apiService.post('nhaxuatban/create', data)
  }
  deleteNhaXuatBan = id => {
    return apiService.delete(`nhaxuatban/${id}`)
  }
  updateNhaXuatBan = (id, data) => {
    return apiService.put(`nhaxuatban/${id}`, data)
  }
  // Sách
  getAllSach = () => {
    return apiService.get('sach')
  }
  getSachById = id => {
    return apiService.get(`sach/${id}`)
  }
  deleteSach = id => {
    return apiService.delete(`sach/${id}`)
  }
  addSach = data => {
    return apiService.post('sach/create', data)
  }
  uploadImg = fd => {
    return apiService.post('sach/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  updateSach = (id, data) => {
    return apiService.put(`sach/${id}`, data)
  }
  // Mượn sách
  muonSach = data => {
    return apiService.post('theodoimuonsach/muonsach', data)
  }
  getTheodoimuonsach = id => {
    return apiService.get(`theodoimuonsach/${id}`)
  }
}

export default new apiServiceMuonSach()
