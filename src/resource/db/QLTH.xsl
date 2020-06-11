<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="xs"
  version="1.0"
>
    <xsl:template match="/">
        <HTML>
            <HEAD>
                <TITLE>QUẢN LÝ TẠP HÓA</TITLE>
            </HEAD>
            <BODY>
                <H2> QUẢN LÝ NHẬP </H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Đơn Hàng Nhập</TH>
                        <TH>Mã Nhà Cung Cấp</TH>
                        <TH>Ngày Nhập</TH>
                        <TH>Giảm Giá</TH>
                        <TH>Kiểu Giảm Giá</TH>
                        <TH>Mã Hàng</TH>
                        <TH>Số Lượng</TH>
                    </TR>
                    <xsl:for-each select="QLTH">
                        <TR>
                            <TD><xsl:value-of select ="DonHangNhap/MaDHN" /></TD>
                            <TD><xsl:value-of select ="DonHangNhap/MaNCC" /></TD>
                            <TD><xsl:value-of select ="DonHangNhap/NgayNhap" /></TD>
                            <TD><xsl:value-of select ="DonHangNhap/GiamGia" /></TD>
                            <TD><xsl:value-of select ="DonHangNhap/KieuGiamGia" /></TD>
                            <TD><xsl:value-of select ="Hang_DonHangNhap/MaH" /></TD>
                            <TD><xsl:value-of select ="Hang_DonHangNhap/SoLuong" /></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>
                <H2> DANH SÁCH MẶT HÀNG </H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Mặt Hàng</TH>
                        <TH>Tên Mặt Hàng</TH>
                        <TH>Đơn Vị</TH>
                        <TH>File Ảnh</TH>
                        <TH>Mã Nhóm Hàng</TH>
                        <TH>Tên Nhóm Hàng</TH>
                    </TR>
                    <xsl:for-each select="QLTH">
                        <TR>
                            <TD><xsl:value-of select ="MauHang/MaMH" /></TD>
                            <TD><xsl:value-of select ="MauHang/TenMH" /></TD>
                            <TD><xsl:value-of select ="MauHang/DonVi" /></TD>
                            <TD><xsl:value-of select ="MauHang/Anh" /></TD>
                            <TD><xsl:value-of select = "NhomHang/MaNH"/></TD>
                            <TD><xsl:value-of select ="NhomHang/TenNH"/></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>
                <H2> NHÀ CUNG CẤP </H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Nhà Cung Cấp</TH>
                        <TH>Tên Nhà Cung Cấp</TH>
                        <TH>Quốc Gia</TH>
                        <TH>Số Điện Thoại</TH>
                    </TR>
                    <xsl:for-each select="QLTH">
                        <TR>
                            <TD><xsl:value-of select="NhaCungCap/MaNCC"/></TD>
                            <TD><xsl:value-of select ="NhaCungCap/TenNCC" /></TD>
                            <TD><xsl:value-of select ="NhaCungCap/QuocGia" /></TD>
                            <TD><xsl:value-of select ="NhaCungCap/SDT" /></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>
                <H2> HÀNG HÓA </H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Hàng</TH>
                        <TH>Mã Mặt Hàng</TH>
                        <TH>Mã Nhà Cung Cấp</TH>
                        <TH>Hạn Sử Dụng</TH>
                        <TH>Ngày Nhập</TH>
                        <TH>Giá Nhập</TH>
                        <TH>Giá Bán</TH>
                        <TH>Số Lượng</TH>
                    </TR>
                    <xsl:for-each select="QLTH/Hang">
                        <TR>
                            <TD><xsl:value-of select="MaH"/></TD>
                            <TD><xsl:value-of select="MaMH"/></TD>
                            <TD><xsl:value-of select="MaNCC"/></TD>
                            <TD><xsl:value-of select="HanSuDung"/></TD>
                            <TD><xsl:value-of select="NgayNhap"/></TD>
                            <TD><xsl:value-of select="GiaNhap"/></TD>
                            <TD><xsl:value-of select="SoLuong"/></TD>
                            <TD><xsl:value-of select="GiaBan"/></TD>

                        </TR>
                    </xsl:for-each>
                </TABLE>

                <H2>QUẢN LÝ XUẤT</H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Đơn Hàng Xuất</TH>
                        <TH>Mã Khách Hàng</TH>
                        <TH>Ngày Xuất</TH>
                        <TH>Giảm Giá</TH>
                        <TH>Kiểu Giảm Giá</TH>

                        <TH>Mã Hàng</TH>
                        <TH>Số Lượng</TH>
                    </TR>

                    <xsl:for-each select="QLTH">
                        <TR>
                            <TD><xsl:value-of select="DonHangXuat/MaDHX"/></TD>
                            <TD><xsl:value-of select="DonHangXuat/MaKH"/></TD>
                            <TD><xsl:value-of select="DonHangXuat/NgayXuat"/></TD>
                            <TD><xsl:value-of select="DonHangXuat/GiamGia"/></TD>
                            <TD><xsl:value-of select="DonHangXuat/KieuGiamGia"/></TD>

                            <TD><xsl:value-of select="Hang_DonHangXuat/MaH"/></TD>
                            <TD><xsl:value-of select="Hang_DonHangXuat/SoLuong"/></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>

                <H2>KHÁCH HÀNG</H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Khách Hàng</TH>
                        <TH>Họ Tên</TH>
                        <TH>File Ảnh</TH>
                        <TH>Địa Chỉ</TH>
                        <TH>Số Điện Thoại</TH>
                        <TH>Email</TH>
                        <TH>Ngày Sinh</TH>
                        <TH>Giới Tính</TH>
                    </TR>

                    <xsl:for-each select="QLTH/KhachHang">
                        <TR>
                            <TD><xsl:value-of select="MaKH"/></TD>
                            <TD><xsl:value-of select="HoTen"/></TD>
                            <TD><xsl:value-of select="Anh"/></TD>
                            <TD><xsl:value-of select="DiaChi"/></TD>
                            <TD><xsl:value-of select="SoDienThoai"/></TD>
                            <TD><xsl:value-of select="Email"/></TD>
                            <TD><xsl:value-of select="NgaySinh"/></TD>
                            <TD><xsl:value-of select="GioiTinh"/></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>

                <H2>NGƯỜI DÙNG (NHÂN VIÊN)</H2>
                <TABLE border="1">
                    <TR>
                        <TH>Mã Người Dùng</TH>
                        <TH>Tài Khoản</TH>
                        <TH>Mật Khẩu</TH>
                        <TH>Chức Vụ</TH>
                        <TH>Họ Tên</TH>
                        <TH>Số Điện Thoại</TH>
                        <TH>Ảnh </TH>
                        <TH>Địa Chỉ</TH>
                        <TH>Giới Tính</TH>
                    </TR>

                    <xsl:for-each select="QLTH/NguoiDung">
                        <TR>
                            <TD><xsl:value-of select="MaND"/></TD>
                            <TD><xsl:value-of select="TaiKhoan"/></TD>
                            <TD><xsl:value-of select="MatKhau"/></TD>
                            <TD><xsl:value-of select="ChucVu"/></TD>
                            <TD><xsl:value-of select="HoTen"/></TD>
                            <TD><xsl:value-of select="SDT"/></TD>
                            <TD><xsl:value-of select="Anh"/></TD>
                            <TD><xsl:value-of select="DiaChi"/></TD>
                            <TD><xsl:value-of select="GioiTinh"/></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>

            </BODY>
        </HTML>
    </xsl:template>

</xsl:stylesheet>