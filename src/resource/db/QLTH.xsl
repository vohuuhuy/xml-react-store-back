<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:key name="NhomHangKey" match="NhomHang" use="MaNH"/>
    <xsl:key name="HangDonHangNhapKey" match="Hang_DonHangNhap" use="MaDHN"/>
    <xsl:key name="HangDonHangNhapKey" match="Hang_DonHangNhap" use="MaH"/>
    <xsl:key name="HangDonHangXuatKey" match="Hang_DonHangXuat" use="MaDHX"/>
    <xsl:key name="TenMatHangKey" match="MauHang" use="MaMH"/>
    <xsl:key name="NhaCCKey" match="NhaCungCap" use="MaNCC"/>
    <xsl:key name="HangKey" match="Hang" use="MaH"/>
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
                        <TH>Mã Hàng</TH>
                        <TH>Số Lượng</TH>
                        <TH>Ngày Nhập</TH>
                        <TH>Giảm Giá</TH>
                        <TH>Kiểu Giảm Giá</TH>     
                    </TR>
                    <xsl:for-each select="QLTH/DonHangNhap">
                        <TR>
                            <TD><xsl:value-of select ="MaDHN" /></TD>
                            <TD><xsl:value-of select ="MaNCC" /></TD>
                            <TD><xsl:value-of select ="key('HangDonHangNhapKey',MaDHN)/MaH" /></TD>
                            <TD><xsl:value-of select ="key('HangDonHangNhapKey',MaDHN)/SoLuong" /></TD>
                            <TD><xsl:value-of select ="NgayNhap" /></TD>
                            <TD><xsl:value-of select ="GiamGia" /></TD>
                            <TD><xsl:value-of select ="KieuGiamGia" /></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>
                
                <H2> DANH SÁCH MẶT HÀNG </H2>
                <TABLE border="1">
                    <TR> 
                        <TH>Mã Mặt Hàng</TH>
                        <TH>Tên Mặt Hàng</TH>
                        <TH>Mã Nhóm Hàng</TH>
                        
                        <TH>Tên Nhóm Hàng</TH>
                        <TH>Đơn Vị</TH>  
                    </TR>
                    
                    <xsl:for-each select="QLTH/MauHang">
                        <TR>
                            <TD><xsl:value-of select ="MaMH" /></TD>
                            <TD><xsl:value-of select ="TenMH" /></TD>
                            <TD><xsl:value-of select ="MaNH" /></TD>

                            <TD><xsl:value-of select ="key('NhomHangKey', MaNH)/TenNH"/></TD>
                            <TD><xsl:value-of select ="DonVi" /></TD>
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
                    
                    <xsl:for-each select="QLTH/NhaCungCap">
                        <TR>
                            <TD><xsl:value-of select="MaNCC"/></TD>
                            <TD><xsl:value-of select ="TenNCC" /></TD>
                            <TD><xsl:value-of select ="QuocGia" /></TD>
                            <TD><xsl:value-of select ="SDT" /></TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>
                
                <H2> HÀNG HÓA </H2>
                <TABLE border="1">
                    <TR> 
                        <TH>Mã Hàng</TH>
                        <TH>Mã Mặt Hàng</TH>
                        <TH>Tên Mặt Hàng</TH>
                        <TH>Mã Nhà Cung Cấp</TH>
                        <TH>Hạn Sử Dụng</TH>    
                        <TH>Ngày Nhập</TH>
                        <TH>Giá Nhập</TH>
                        <TH>Số Lượng</TH>
                        <TH>Giá Bán</TH>
                    </TR>
                    
                    <xsl:for-each select="QLTH/Hang">
                        <TR>
                            <TD><xsl:value-of select="MaH"/></TD>
                            <TD><xsl:value-of select="MaMH"/></TD>
                            <TD><xsl:value-of select="key('TenMatHangKey', MaMH)/TenMH"/></TD>
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
                    
                    <xsl:for-each select="QLTH/DonHangXuat">
                        <TR>
                            <TD><xsl:value-of select="MaDHX"/></TD>
                            <TD><xsl:value-of select="MaKH"/></TD>
                            <TD><xsl:value-of select="NgayXuat"/></TD>
                            <TD><xsl:value-of select="GiamGia"/></TD>
                            <TD><xsl:value-of select="KieuGiamGia"/></TD>
                            
                            <TD><xsl:value-of select="key('HangDonHangXuatKey',MaDHX)/MaH"/></TD>
                            <TD><xsl:value-of select="key('HangDonHangXuatKey',MaDHX)/SoLuong"/></TD>                            
                        </TR>
                    </xsl:for-each>
                </TABLE>
                
                <H2>QUẢN LÝ XUẤT</H2>
                <TABLE border="1">
                    <TR> 
                        <TH>Mã Đơn Hàng Xuất</TH>
                        <TH>Mã Khách Hàng</TH>
                        <TH>Ngày Xuất</TH>
                        <TH>Mã Hàng</TH>
                        <TH>Số Lượng</TH>  
                        <TH>Hạn SD</TH> 
                        <TH>Giảm Giá</TH>    
                        <TH>Kiểu Giảm Giá</TH>
                        
                         
                    </TR>
                    
                    <xsl:for-each select="QLTH/DonHangXuat | QLTH/Hang">
                        <xsl:choose>
                            <xsl:when test="MaDHX = 'DHX001'">
                                
                                <TD><xsl:value-of select="key('HangKey',MaH)/MaH"/></TD>
                                <TD><xsl:value-of select="key('HangKey',MaH)/SoLuong"/></TD>
                                <TD><xsl:value-of select="key('HangKey',MaH)/HanSuDung"/></TD>
                            </xsl:when>
                        </xsl:choose>
                        <TR>
     
                            
                            
                        </TR>
                    </xsl:for-each>
                </TABLE>
                <H2>Hàng Nhập Từ Nhà Cung Cấp <B>Thúy Hương</B></H2>
                <TABLE border="1">
                    <TR> 
                        <TH>Mã Nhà Cung Cấp</TH>
                        <th>Tên Nhà Cung Cấp</th>
                        <TH>Mã Mặt Hàng</TH>
                        <TH>Ngày Nhập</TH>
                        <TH>Số Lượng</TH>    
                        <TH>Giá Nhập Vào</TH>
 
                    </TR>
                    
                    <xsl:for-each select="QLTH/Hang">
                        <xsl:choose> 
                            <xsl:when test = "MaNCC = 'NTH005'"> 
                                <TR>
                                    <TD><xsl:value-of select="MaNCC"/></TD>
                                    <TD><xsl:value-of select="key('NhaCCKey',MaNCC)/TenNCC"/></TD>
                                    <TD><xsl:value-of select="MaMH"/></TD>
                                    <TD><xsl:value-of select="NgayNhap"/></TD>  
                                    <TD><xsl:value-of select="SoLuong"/></TD>   
                                    <TD><xsl:value-of select="GiaNhap"/></TD>                        
                                </TR>
                            </xsl:when> 
                        </xsl:choose> 
                        
                    </xsl:for-each>
                </TABLE>
                
                
                <H2>KHÁCH HÀNG</H2>
                <TABLE border="1">
                    <TR> 
                        <TH>Mã Khách Hàng</TH>
                        <TH>Họ Tên</TH>
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
                        <TH>Chức Vụ</TH>    
                        <TH>Họ Tên</TH>
                        <TH>Số Điện Thoại</TH>
                        <TH>Địa Chỉ</TH>   
                        <TH>Giới Tính</TH>  
                    </TR>
                    
                    <xsl:for-each select="QLTH/NguoiDung">
                        <xsl:if test="GioiTinh='female'">
                            <TR>
                                <TD><xsl:value-of select="MaND"/></TD>
                                <TD><xsl:value-of select="TaiKhoan"/></TD>
                                <TD><xsl:value-of select="ChucVu"/></TD>
                                <TD><xsl:value-of select="HoTen"/></TD>
                                <TD><xsl:value-of select="SDT"/></TD>
                                <TD><xsl:value-of select="DiaChi"/></TD>    
                                <TD><xsl:value-of select="GioiTinh"/></TD>   
                            </TR>
                        </xsl:if>   
                    </xsl:for-each>
                </TABLE>
                            
            </BODY>
        </HTML>
    </xsl:template>
    
</xsl:stylesheet>