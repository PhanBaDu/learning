-- a: Viết thủ tục/hàm với tham số truyền vào là ngày A(dd/mm/yyyy), thủ tục/hàm dùng để
-- lấy danh sách các trận đấu diễn ra vào ngày ngày A, danh sách được sắp xếp theo
-- MaTD, Sân đấu.
CREATE PROCEDURE dbo.LayDanhSachTranDauTheoNgay
    @Ngay DATE  -- Tham số đầu vào: Ngày A
AS
BEGIN
    -- Truy vấn để lấy danh sách trận đấu diễn ra vào ngày @Ngay
    SELECT MaTD, TrongTai, SanDau, MaDB1, MaDB2, Ngay
    FROM TranDau
    WHERE Ngay = @Ngay
    ORDER BY MaTD, SanDau;  -- Sắp xếp theo MaTD và SanDau
END;

EXEC dbo.LayDanhSachTranDauTheoNgay
    @Ngay = '2024-06-11';
-- b: Viết thủ tục/ hàm với tham số truyền vào là tên A, thủ tục/hàm dùng để lấy ra danh sách
-- các cầu thủ có tên tương tự với tên A truyền vào này.
CREATE PROCEDURE dbo.LayDanhSachCauThuTheoTen
    @TenA NVARCHAR(50)  -- Tham số đầu vào: Tên cầu thủ A
AS
BEGIN
    -- Truy vấn để lấy danh sách các cầu thủ có tên tương tự với tên @TenA
    SELECT MaCT, TenCT, MaDB
    FROM CauThu
    WHERE TenCT LIKE '%' + @TenA + '%'  -- Tìm tên cầu thủ có chứa chuỗi @TenA
    ORDER BY TenCT;  -- Sắp xếp theo tên cầu thủ
END;

EXEC dbo.LayDanhSachCauThuTheoTen
    @TenA = N'Nhất';
-- c: Tạo thủ tục/hàm có tham số truyền vào là MaTD. Thủ tục/hàm này dùng để lấy danh
-- sách các cầu thủ đã thi đấu trong trận đấu đó. Danh sách gồm có MaCT, TenCT, SoTrai
CREATE PROCEDURE dbo.LayDanhSachCauThuTheoMaTD
    @MaTD VARCHAR(20)  -- Tham số đầu vào: Mã trận đấu (MaTD)
AS
BEGIN
    -- Truy vấn để lấy danh sách cầu thủ tham gia trận đấu với mã trận đấu @MaTD
    SELECT CauThu.MaCT, CauThu.TenCT, ThamGia.SoTrai
    FROM CauThu
    JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT  -- Kết nối với bảng ThamGia để lấy thông tin cầu thủ
    WHERE ThamGia.MaTD = @MaTD  -- Lọc theo mã trận đấu
    ORDER BY CauThu.TenCT;  -- Sắp xếp kết quả theo tên cầu thủ
END;

EXEC dbo.LayDanhSachCauThuTheoMaTD
    @MaTD = 'td001';
-- d: Tạo thủ tục/hàm dùng để thống kê mỗi trọng tài đã điều khiển bao nhiêu trận đấu.
CREATE PROCEDURE dbo.ThongKeSoTranDauCuaTrongTai
AS
BEGIN
    -- Truy vấn để đếm số trận đấu mà mỗi trọng tài đã điều khiển
    SELECT TrongTai, COUNT(MaTD) AS SoTranDau
    FROM TranDau
    GROUP BY TrongTai  -- Nhóm theo trọng tài
    ORDER BY SoTranDau DESC;  -- Sắp xếp theo số lượng trận đấu giảm dần
END;
EXEC dbo.ThongKeSoTranDauCuaTrongTai;
-- e: Tạo thủ tục/hàm với tham số truyền vào là ngay1(dd/mm/yyyy) và
-- ngay2(dd/mm/yyyy), thủ tục/hàm dùng để thống kê số trận đấu của các đội bóng (làm
-- chủ nhà) đã thi đấu trong các ngày từ ngay1 đến ngay2.
CREATE PROCEDURE dbo.ThongKeSoTranDauCuaDB_ChuNha
    @Ngay1 DATE,   -- Tham số đầu vào: Ngày bắt đầu (Ngay1)
    @Ngay2 DATE    -- Tham số đầu vào: Ngày kết thúc (Ngay2)
AS
BEGIN
    -- Truy vấn để thống kê số trận đấu của các đội bóng làm chủ nhà trong khoảng thời gian @Ngay1 đến @Ngay2
    SELECT MaDB1, COUNT(MaTD) AS SoTranDau
    FROM TranDau
    WHERE Ngay BETWEEN @Ngay1 AND @Ngay2  -- Lọc theo ngày trong khoảng từ @Ngay1 đến @Ngay2
    GROUP BY MaDB1  -- Nhóm theo đội bóng làm chủ nhà
    ORDER BY SoTranDau DESC;  -- Sắp xếp theo số trận đấu giảm dần
END;
EXEC dbo.ThongKeSoTranDauCuaDB_ChuNha
    @Ngay1 = '2024-01-01',
    @Ngay2 = '2024-12-31';
-- f: Viết thủ tục dùng để thêm mới 1 dòng dữ liệu vào bảng đội bóng, bảng cầu thủ, bảng
-- trận đấu, và bảng tham gia.
CREATE PROCEDURE dbo.ThemMoiDuLieusx
    -- Thông tin đội bóng
    @MaDB INT,
    @TenDB NVARCHAR(50),
    @MaCLB INT,
    
    -- Thông tin cầu thủ
    @MaCT VARCHAR(20),
    @TenCT NVARCHAR(50),
    
    -- Thông tin trận đấu
    @MaTD VARCHAR(20),
    @TrongTai NVARCHAR(50),
    @SanDau NVARCHAR(30),
    @MaDB1 INT,
    @MaDB2 INT,
    @Ngay DATETIME,
    
    -- Thông tin tham gia
    @SoTrai INT,
    
    -- Tham số trả về kết quả
    @KetQua NVARCHAR(255) OUTPUT
AS
BEGIN
    -- Bắt đầu giao dịch (Transaction) để đảm bảo tính nhất quán
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra xem đội bóng có tồn tại không
        IF EXISTS (SELECT 1 FROM DoiBong WHERE MaDB = @MaDB)
        BEGIN
            SET @KetQua = N'Đội bóng đã tồn tại.';
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Kiểm tra xem cầu thủ có tồn tại trong bảng CauThu không
        IF EXISTS (SELECT 1 FROM CauThu WHERE MaCT = @MaCT)
        BEGIN
            SET @KetQua = N'Cầu thủ đã tồn tại, không thể thêm mới.';
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Kiểm tra xem mã trận đấu đã tồn tại chưa
        IF EXISTS (SELECT 1 FROM TranDau WHERE MaTD = @MaTD)
        BEGIN
            SET @KetQua = N'Mã trận đấu đã tồn tại.';
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Thêm mới dữ liệu vào bảng DoiBong
        INSERT INTO DoiBong (MaDB, TenDB, MaCLB)
        VALUES (@MaDB, @TenDB, @MaCLB);

        -- Thêm mới dữ liệu vào bảng CauThu
        INSERT INTO CauThu (MaCT, TenCT, MaDB)
        VALUES (@MaCT, @TenCT, @MaDB);

        -- Thêm mới dữ liệu vào bảng TranDau
        INSERT INTO TranDau (MaTD, TrongTai, SanDau, MaDB1, MaDB2, Ngay)
        VALUES (@MaTD, @TrongTai, @SanDau, @MaDB1, @MaDB2, @Ngay);

        -- Thêm mới dữ liệu vào bảng ThamGia
        INSERT INTO ThamGia (MaTD, MaCT, SoTrai)
        VALUES (@MaTD, @MaCT, @SoTrai);

        -- Nếu tất cả các câu lệnh trên thực hiện thành công, commit giao dịch
        COMMIT TRANSACTION;

        -- Trả về kết quả thành công
        SET @KetQua = N'Thêm mới dữ liệu thành công.';
    END TRY
    BEGIN CATCH
        -- Nếu có lỗi, rollback giao dịch
        ROLLBACK TRANSACTION;

        -- Trả về thông báo lỗi
        SET @KetQua = N'Lỗi: ' + ERROR_MESSAGE();
    END CATCH
END;

DECLARE @KetQua NVARCHAR(255);

-- Gọi thủ tục để thêm mới dữ liệu
EXEC dbo.ThemMoiDuLieusx 
    @MaDB = 3,
    @TenDB = 'Đội bóng ABC',
    @MaCLB = 1001,
    
    @MaCT = 'ct002',
    @TenCT = 'Cầu thủ A',
    
    @MaTD = 'td004',
    @TrongTai = 'Trọng Tài X',
    @SanDau = 'Sân vận động A',
    @MaDB1 = 1,
    @MaDB2 = 2,
    @Ngay = '2024-12-01 19:00:00',
    
    @SoTrai = 2,  -- Số bàn thắng của cầu thủ A
    
    @KetQua = @KetQua OUTPUT;

SELECT @KetQua AS KetQua;

-- g: Viết thủ tục dùng để cập nhật dữ liệu của một cầu thủ, với thông tin cầu thủ là tham số
-- truyền vào và tham số @ketqua sẽ trả về chuỗi rỗng nếu cập nhật cầu thủ thành công,
-- ngược lại tham số này trả về chuỗi cho biết lý do không cập nhật được.
CREATE PROCEDURE dbo.CapNhatCauThu
    @MaCT VARCHAR(20),    -- Mã cầu thủ cần cập nhật
    @TenCT NVARCHAR(50),  -- Tên cầu thủ cần cập nhật
    @ketqua NVARCHAR(255) OUTPUT  -- Kết quả thông báo
AS
BEGIN
    -- Kiểm tra xem cầu thủ có tồn tại trong bảng CauThu không
    IF NOT EXISTS (SELECT * FROM CauThu WHERE MaCT = @MaCT)
    BEGIN
        -- Nếu cầu thủ không tồn tại, trả về thông báo lỗi
        SET @ketqua = N'Cầu thủ không tồn tại trong hệ thống.';
        RETURN;
    END

    -- Tiến hành cập nhật thông tin cầu thủ
    UPDATE CauThu
    SET TenCT = @TenCT
    WHERE MaCT = @MaCT;

    -- Kiểm tra xem cập nhật có thành công không
    IF @@ROWCOUNT > 0
    BEGIN
        -- Nếu cập nhật thành công, trả về chuỗi rỗng
        SET @ketqua = N'Cập nhật thành công!';
    END
    ELSE
    BEGIN
        -- Nếu không có dòng nào bị cập nhật, trả về thông báo lỗi
        SET @ketqua = N'Lỗi không thể cập nhật thông tin cầu thủ.';
    END
END;

DECLARE @ketqua NVARCHAR(255);

-- Gọi thủ tục cập nhật cầu thủ
EXEC dbo.CapNhatCauThu 
    @MaCT = 'ct001',        -- Mã cầu thủ cần cập nhật
    @TenCT = 'Cầu thủ X', -- Tên cầu thủ mới
    @ketqua = @ketqua OUTPUT;

-- In kết quả
SELECT @ketqua AS KetQua;

-- h: Viết hàm với tham số truyền vào là năm, hàm dùng để lấy ra số trọng tài đã tham gia
-- điều khiển các trận đấu trong năm truyền vào.
CREATE FUNCTION dbo.fn_SoTrongTaiTrongNam (@Nam INT)
RETURNS INT
AS
BEGIN
    DECLARE @SoTrongTai INT;

    -- Đếm số trọng tài duy nhất đã tham gia điều khiển các trận đấu trong năm @Nam
    SELECT @SoTrongTai = COUNT(DISTINCT TrongTai)
    FROM TranDau
    WHERE YEAR(Ngay) = @Nam;

    -- Trả về số trọng tài
    RETURN @SoTrongTai;
END;

SELECT dbo.fn_SoTrongTaiTrongNam(2024) AS SoTrongTai;

-- i: Viết thủ tục vào tham số truyền vào là mã cầu thủ, thủ tục dùng để xóa cầu thủ này.
-- (Gợi ý: nếu cầu thủ này đã từng tham gia ít nhất một trận đấu thì phải xóa dữ liệu ở
-- bảng ThamGia trước rồi tiến hành xóa cầu thủ này)
CREATE PROCEDURE dbo.XoaCauThuX
    @MaCT VARCHAR(20)  -- Tham số truyền vào: mã cầu thủ
AS
BEGIN
    -- Kiểm tra xem cầu thủ có tham gia trận đấu nào không
    IF EXISTS (SELECT 1 FROM ThamGia WHERE MaCT = @MaCT)
    BEGIN
        -- Xóa dữ liệu trong bảng ThamGia (nếu cầu thủ đã tham gia ít nhất 1 trận đấu)
        DELETE FROM ThamGia WHERE MaCT = @MaCT;
    END

    -- Xóa cầu thủ khỏi bảng CauThu
    DELETE FROM CauThu WHERE MaCT = @MaCT;
    
    -- Kiểm tra nếu xóa thành công
    IF @@ROWCOUNT > 0
    BEGIN
        PRINT N'Cầu thủ đã được xóa thành công.';
    END
    ELSE
    BEGIN
        PRINT N'Cầu thủ không tồn tại trong hệ thống.';
    END
END;

EXEC dbo.XoaCauThuX @MaCT = 'ct002'; 

-- j: Viết hàm với tham số truyền vào là macauthu, hàm dùng để lấy ra tổng bàn thắng của
-- cầu thủ này.
CREATE FUNCTION dbo.fn_TongBanThang (@MaCT VARCHAR(20))
RETURNS INT
AS
BEGIN
    DECLARE @TongBanThang INT;

    SELECT @TongBanThang = ISNULL(SUM(ThamGia.SoTrai), 0)
    FROM ThamGia
    WHERE ThamGia.MaCT = @MaCT;

    RETURN @TongBanThang;
END;

SELECT dbo.fn_TongBanThang('ct001') AS TongBanThang;

-- k: Viết một hàm trả về tổng bàn thắng mà mỗi cầu thủ ghi được trong tất cả các trận.
CREATE FUNCTION dbo.fn_TongBanThangCauThu()
RETURNS TABLE
AS
RETURN
(
    SELECT 
        CauThu.MaCT, 
        CauThu.TenCT, 
        ISNULL(SUM(ThamGia.SoTrai), 0) AS TongBanThang
    FROM CauThu
    LEFT JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT
    GROUP BY CauThu.MaCT, CauThu.TenCT
);

SELECT * FROM dbo.fn_TongBanThangCauThu();

-- l: Viết thủ tục/hàm lấy danh sách các cầu thủ ghi nhiều bàn thắng nhất.
CREATE PROCEDURE LayCauThuGhiNhieuBanThangs
AS
BEGIN
	DECLARE @MaxGoals INT;

	SELECT @MaxGoals = MAX(TongBanThang)
	FROM (
		SELECT CauThu.MaCT, ISNULL(SUM(ThamGia.SoTrai), 0) AS TongBanThang
		FROM CauThu
		LEFT JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT
		GROUP BY CauThu.MaCT
	) AS X;

	SELECT CauThu.MaCT, CauThu.TenCT, ISNULL(SUM(ThamGia.SoTrai), 0) AS TongBanThang
    FROM CauThu
    LEFT JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT
    GROUP BY CauThu.MaCT, CauThu.TenCT
    HAVING ISNULL(SUM(ThamGia.SoTrai), 0) = @MaxGoals;
END;

EXEC LayCauThuGhiNhieuBanThangs;
-- Declare @maxBong int;
-- SELECT @maxBong = MAX(TongBanThang) FROM dbo.fn_TongBanThangCauThu();
-- SELECT * FROM dbo.fn_TongBanThangCauThu() where @maxBong = TongBanThang

-- m: Viết thủ tục/hàm với tham số truyền vào số A, thủ tục/hàm dùng để lấy ra danh sách các
-- cầu thủ ghi số bàn thắng lớn hơn số A này.
CREATE PROCEDURE LayCauThuBanThangLonHonA
    @A INT 
AS
BEGIN
    SELECT CauThu.MaCT, CauThu.TenCT, ISNULL(SUM(ThamGia.SoTrai), 0) AS TongBanThang
    FROM CauThu 
    LEFT JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT
    GROUP BY CauThu.MaCT, CauThu.TenCT
    HAVING COALESCE(SUM(ThamGia.SoTrai), 0) > @A;
END;

EXEC LayCauThuBanThangLonHonA @A = 2;

-- n: Viết thủ tục/hàm với tham số truyền vào là @nam. Thủ tục/hàm dùng để thống kê mỗi
-- tháng trong năm truyền vào có bao nhiêu trận đấu được diễn ra. Nếu tháng nào không
-- có trận đấu nào tổ chức thì ghi là 0.
CREATE PROCEDURE ThongKeTranDauTheoThans
    @nam INT
AS
BEGIN
    DECLARE @thang INT = 1;
    DECLARE @soTranDau INT;

    WHILE @thang <= 12
    BEGIN
        SELECT @soTranDau = ISNULL(COUNT(MaTD), 0)
        FROM TranDau
        WHERE YEAR(Ngay) = @nam AND MONTH(Ngay) = @thang;

        PRINT N'Tháng ' + CAST(@thang AS VARCHAR(2)) + ': ' + CAST(@soTranDau AS VARCHAR(10)) + N' trận đấu';

        SET @thang = @thang + 1;
    END
END

EXEC ThongKeTranDauTheoThans @nam = 2024;

-- o: Viết một thủ tục dùng để tạo ra một bảng mới có tên CauThu_BanThang, bảng này
-- chứa tổng số bàn thắng mà mỗi cầu thủ ghi được. Nếu cầu thủ nào chưa ghi bàn thắng
-- nào thì ghi số bàn thắng là 0.
CREATE PROCEDURE CreateCauThuBanThang
AS
BEGIN
	IF OBJECT_ID('CauThu_BanThang', 'U') IS NOT NULL
		BEGIN
			DROP TABLE CauThu_BanThang;
		END

	CREATE TABLE CauThu_BanThang (
        MaCT varchar(20) PRIMARY KEY,  
        TongBanThang int DEFAULT 0 
    );

	INSERT INTO CauThu_BanThang (MaCT, TongBanThang)
    SELECT CauThu.MaCT, ISNULL(SUM(SoTrai), 0) 
    FROM CauThu
    LEFT JOIN ThamGia ON CauThu.MaCT = ThamGia.MaCT
    GROUP BY CauThu.MaCT
END

EXEC CreateCauThuBanThang;
SELECT * FROM CauThu_BanThang;

-- p: Viết một trigger, trigger này dùng để cập nhật tổng bàn thắng của cầu thủ ở bảng
-- CauThu_BanThang mỗi khi có cập nhật hoặc thêm mới số bàn thắng của cầu thủ ở
-- bảng ThamGia.
CREATE TRIGGER trg_UpdateTongBanThangx
ON ThamGia
AFTER INSERT, UPDATE
AS
BEGIN
    -- Kiểm tra nếu MaTD không NULL, nếu không thì tiếp tục xử lý
    IF EXISTS (SELECT 1 FROM inserted WHERE MaTD IS NOT NULL)
    BEGIN
        -- Con trỏ để duyệt qua các cầu thủ vừa thay đổi số bàn thắng
        DECLARE @MaCT VARCHAR(20), @SoTrai INT;

        -- Duyệt qua bảng inserted (chứa dữ liệu mới)
        DECLARE curs CURSOR FOR
            SELECT MaCT, SoTrai
            FROM inserted
            WHERE MaTD IS NOT NULL;  -- Đảm bảo MaTD không NULL

        OPEN curs;
        FETCH NEXT FROM curs INTO @MaCT, @SoTrai;

        -- Lặp qua tất cả các cầu thủ trong bảng inserted
        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Cập nhật tổng số bàn thắng của cầu thủ trong bảng CauThu_BanThang
            UPDATE CauThu_BanThang
            SET TongBanThang = (
                SELECT ISNULL(SUM(SoTrai), 0) 
                FROM ThamGia 
                WHERE MaCT = @MaCT
            )
            WHERE MaCT = @MaCT;

            -- Tiến hành duyệt tiếp các cầu thủ tiếp theo
            FETCH NEXT FROM curs INTO @MaCT, @SoTrai;
        END;

        CLOSE curs;
        DEALLOCATE curs;
    END
    ELSE
    BEGIN
        PRINT 'Lỗi: MaTD không được NULL!';
    END
END;


-- Kiểm tra xem MaTD và MaCT đã tồn tại trong bảng ThamGia chưa
IF NOT EXISTS (SELECT 1 FROM ThamGia WHERE MaTD = 'TD0070' AND MaCT = 'CT0080')
BEGIN
    -- Nếu chưa tồn tại, thực hiện thao tác INSERT
    INSERT INTO ThamGia (MaTD, MaCT, SoTrai)
    VALUES ('TD0070', 'CT0080', 3);
END
ELSE
BEGIN
    PRINT 'Dữ liệu đã tồn tại: Trùng MaTD và MaCT';
END;
