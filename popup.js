
document.getElementById("v_cache").addEventListener("click", function () {
    var c_time = parseFloat(document.getElementById("c_time").value);
    var m_time = parseFloat(document.getElementById("m_time").value);
    var tlb = parseFloat(document.getElementById("tlb").value);
    var ave = c_time * tlb + m_time * (1 - tlb);
    var ave_eff = (c_time + m_time) * tlb + (c_time + 2 * m_time) * (1 - tlb);
    document.getElementById("ave").value = ave;
    document.getElementById("ave_eff").value = ave_eff;
})
document.getElementById("v_scan_look").addEventListener("click", function () {
    var order = document.getElementById("io_fifo").value;
    var curr_io = parseInt(document.getElementById("curr_io").value);
    var last_io = parseInt(document.getElementById("last_io").value);
    var numofTrack = parseInt(document.getElementById("numOfTrack").value);
    order.replace(/\s*\,\s*/g," ");
    var str = order.split(" ");
    var arr = [];
    str.forEach(element => {
        arr.push(parseInt(element));
    });
    var pos;
    var SCAN = curr_io + "-->";
    var CSCAN = curr_io + "-->";
    var LOOK = curr_io + "-->";
    var CLOOK = curr_io + "-->";
    var num_trackSCAN;
    var num_trackCSCAN
    var num_trackLOOK;
    var num_trackCLOOK;

    if (curr_io > last_io) {
        arr.sort(function (a, b) { return a - b });
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > curr_io) {
                pos = i;
                break;
            }
        }
        for (var i = pos; i < arr.length; i++) {
            SCAN += arr[i] + "-->";
            LOOK += arr[i] + "-->";
            CSCAN += arr[i] + "-->";
            CLOOK += arr[i] + "-->";
        }
        SCAN += (numofTrack - 1) + "-->";
        CSCAN += (numofTrack - 1) + "---0-->";
        for (var i = pos - 1; i >= 0; i--) {
            SCAN += arr[i] + "-->";
        }
        for (var i = 0; i < pos; i++) {
            CSCAN += arr[i] + "-->";
        }
        SCAN = SCAN.substr(0, SCAN.length - 3);
        CSCAN = CSCAN.substr(0, CSCAN.length - 3);
        // LOOK+=numofTrack+"-->0-->";
        CLOOK = CLOOK.substr(0, CLOOK.length - 1) + "-";
        for (var i = 0; i < pos; i++) {
            CLOOK += arr[i] + "-->";
        }
        for (var i = pos - 1; i >= 0; i--) {
            LOOK += arr[i] + "-->";
        }
        LOOK = LOOK.substr(0, LOOK.length - 3);
        CLOOK = CLOOK.substr(0, CLOOK.length - 3);

        num_trackSCAN = 2 * (numofTrack - 1) - curr_io - arr[0];
        num_trackCSCAN = numofTrack - 1 - curr_io + arr[pos - 1];
        num_trackLOOK = 2 * arr[arr.length - 1] - curr_io - arr[0];
        num_trackCLOOK = arr[arr.length - 1] - curr_io + arr[pos - 1];


    } else {
        arr.sort(function (a, b) { return b - a });
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < curr_io) {
                pos = i;
                break;
            }
        }
        for (var i = pos; i < arr.length; i++) {
            SCAN += arr[i] + "-->";
            LOOK += arr[i] + "-->";
            CSCAN += arr[i] + "-->";
            CLOOK += arr[i] + "-->";
        }
        SCAN += "0-->";
        CSCAN += "0---" + (numofTrack - 1) + "-->"
        for (var i = pos - 1; i >= 0; i--) {
            SCAN += arr[i] + "-->";
        }
        for (var i = 0; i < pos; i++) {
            CSCAN += arr[i] + "-->";
        }
        SCAN = SCAN.substr(0, SCAN.length - 3);
        CSCAN = CSCAN.substr(0, CSCAN.length - 3);
        CLOOK = CLOOK.substr(0, CLOOK.length - 1) + "-"
        for (var i = pos - 1; i >= 0; i--) {
            LOOK += arr[i] + "-->";
        }
        for (var i = 0; i < pos; i++) {
            CLOOK += arr[i] + "-->";
        }
        LOOK = LOOK.substr(0, LOOK.length - 3);
        CLOOK = CLOOK.substr(0, CLOOK.length - 3);
        num_trackSCAN = curr_io + arr[0];
        num_trackCSCAN = curr_io + numofTrack - arr[pos - 1];
        num_trackLOOK = curr_io - 2 * arr[arr.length - 1] + arr[0];
        num_trackCLOOK = curr_io - arr[arr.length - 1] + arr[0] - arr[pos - 1];
    }
    document.getElementById("scan").value = SCAN;
    document.getElementById("look").value = LOOK;
    document.getElementById("cscan").value = CSCAN;
    document.getElementById("clook").value = CLOOK;
    document.getElementById("numOfTrackSCAN").innerText = num_trackSCAN;
    document.getElementById("numOfTrackCSCAN").innerText = num_trackCSCAN;
    document.getElementById("numOfTrackLOOK").innerText = num_trackLOOK;
    document.getElementById("numOfTrackCLOOK").innerText = num_trackCLOOK;

    console.log(arr)
})
document.getElementById("v_page_table").addEventListener("click", function () {
    var virtual_size = parseFloat(document.getElementById("virtual_size").value);
    var num_of_frame = parseInt(document.getElementById("num_of_frame").value);
    var frame_size = parseInt(document.getElementById("frame_size").value);
    var unit_size = parseInt(document.getElementById("unit_size").value);
    var sl_virtual_size = document.getElementById("sl_virtual_size");
    var vt_unit = (sl_virtual_size.options[sl_virtual_size.selectedIndex].value);
    virtual_size = convertToByte(virtual_size, vt_unit);
    var sl_frame_size = document.getElementById("sl_frame_size");
    var fs_unit = (sl_frame_size.options[sl_frame_size.selectedIndex].value);
    frame_size = convertToByte(frame_size, fs_unit);
    var sl_unit_size = document.getElementById("sl_unit_size");
    var us_unit = (sl_unit_size.options[sl_unit_size.selectedIndex].value);
    unit_size = convertToByte(unit_size, us_unit);
    var num_of_bit_used = parseInt(document.getElementById("num_of_bit_used").value);
    var num_of_page = virtual_size / frame_size;// số page
    var num_of_unit = Math.pow(2, num_of_bit_used);
    var main_memory_size;
    console.log(num_of_bit_used);
    console.log(num_of_frame);
    if (!isNaN(num_of_bit_used)) {
        main_memory_size = num_of_unit * unit_size;
        num_of_frame = main_memory_size / frame_size;
        document.getElementById("num_of_frame").value = num_of_frame;
    } else {
        main_memory_size = num_of_frame * frame_size;
    }
    // số bit được dùng để đánh địa chỉ
    document.getElementById("num_of_bit_for_page").value= howManyBit(num_of_page);
    document.getElementById("num_of_bit_for_frame").value= howManyBit(num_of_frame);
    // dung lượng bộ nhớ chính
    document.getElementById("mm_size_byte").value = main_memory_size + " (byte)";
    document.getElementById("mm_size_KB").value = bit2KB(byte2bit(main_memory_size)) + " (KB)";
    document.getElementById("mm_size_MB").value = bit2MB(byte2bit(main_memory_size)) + " (MB)";
    document.getElementById("mm_size_GB").value = bit2GB(byte2bit(main_memory_size)) + " (MB)";


    // phân trang bt
    var row_size = howManyBit(num_of_frame) + howManyBit(num_of_page);
    var page_table_size = num_of_page * (row_size);
    document.getElementById("page_table_size_bit").value = page_table_size + " (bit)";
    document.getElementById("page_table_size_byte").value = convertToByte(page_table_size, "bit") + " (byte)";
    document.getElementById("page_table_size_KB").value = bit2KB(page_table_size) + " (KB)";
    document.getElementById("page_table_size_MB").value = bit2MB(page_table_size) + " (MB)";
    //phân trang nghịch đảo;
    var r_page_table_size = num_of_frame * row_size;
    document.getElementById("r_page_table_size_bit").value = r_page_table_size + " (bit)";
    document.getElementById("r_page_table_size_byte").value = convertToByte(r_page_table_size, "bit") + " (byte)";
    document.getElementById("r_page_table_size_KB").value = bit2KB(r_page_table_size) + " (KB)";
    document.getElementById("r_page_table_size_MB").value = bit2MB(r_page_table_size) + " (MB)";

})
document.getElementById("v_disk").addEventListener("click", function () {
    var rpm = parseFloat(document.getElementById("rpm").value);
    var sector_count = parseInt(document.getElementById("sector_count").value);
    var sector_size = parseInt(document.getElementById("sector_size").value);
    var sl_sector_size = document.getElementById("sl_sector_size");
    // đưa tất cả về s và byte
    var st_unit = (sl_sector_size.options[sl_sector_size.selectedIndex].value);
    sector_size = convertToByte(sector_size, st_unit);
    rpm = rpm / 60;
    var ave_find_track_time=parseInt(document.getElementById("ave_track_find_time").value);
    // chưa biết làm nha
    if(!isNaN(ave_find_track_time)){
        rpm/=(ave_find_track_time/1000);
    }
    var speed = sector_count * sector_size * rpm;//byte per second
    console.log(speed);
    document.getElementById("disk_speed_KbpSec").value = byte2bit(speed)/Math.pow(2,10) + " Kbps";
    document.getElementById("disk_speed_KBpSec").value = bit2KB(byte2bit(speed)) + " KBps";
    document.getElementById("disk_speed_MBpSec").value = bit2MB(byte2bit(speed)) + " MBps";
    document.getElementById("disk_speed_GBpSec").value = bit2GB(byte2bit(speed)) + " GBps";

    document.getElementById("disk_speed_KbpMin").value = (byte2bit(speed)*60)/Math.pow(2,10) + " Kbpm";
    document.getElementById("disk_speed_KBpMin").value = bit2KB(byte2bit(speed))*60 + " KBpm";
    document.getElementById("disk_speed_MBpMin").value = bit2MB(byte2bit(speed))*60 + " MBpm";
    document.getElementById("disk_speed_GBpMin").value = bit2GB(byte2bit(speed))*60 + " GBpm";



})
document.getElementById("call_page_no").addEventListener("click", function () {
    var page_size=parseInt(document.getElementById("page_size").value);
    var sl_page_size = document.getElementById("sl_page_size");
    var ps_unit = (sl_page_size.options[sl_page_size.selectedIndex].value);
    console.log(page_size);
    page_size=convertToByte(page_size,ps_unit);
    var sl_base_add = document.getElementById("sl_base_add");
    var base = (sl_base_add.options[sl_base_add.selectedIndex].value.substr(5,2));
    var logic_add= parseInt(document.getElementById("logic_add").value,base);
    console.log(logic_add);
    var page_no=Math.floor(logic_add/page_size);
    console.log(page_size);
    document.getElementById("page_no").value=page_no;
    document.getElementById("offset").value= logic_add-page_no*page_size;
})
document.getElementById("v_add_convert").addEventListener("click", function () {
    

    var page_size=parseInt(document.getElementById("page_size").value);
    var frame_no= parseInt(document.getElementById("frame_no").value);
    var offset= parseInt(document.getElementById("offset").value);
    var phy_add= frame_no*page_size+offset;
    document.getElementById("phy_add").value= phy_add + " (Dec) hoặc "+ Dec2Hex(phy_add)+ " (Hex)";
})
document.getElementById("v_FAT").addEventListener("click", function () {
    var disk_size= parseInt(document.getElementById("disk_size").value);
    var sl_disk_size = document.getElementById("sl_disk_size");
    var ds_unit = (sl_disk_size.options[sl_disk_size.selectedIndex].value);
    disk_size= convertToByte(disk_size,ds_unit);
    var block_size= parseInt(document.getElementById("block_size").value);
    var sl_block_size = document.getElementById("sl_block_size");
    var bs_unit = (sl_block_size.options[sl_block_size.selectedIndex].value);
    block_size= convertToByte(block_size,bs_unit);
    var num_of_block= disk_size/block_size;
    var bit = howManyBit(num_of_block);
    var FAT_size= num_of_block*bit;
    document.getElementById("FAT_size").value= FAT_size+ " (bit) || "+ convertToByte(FAT_size,"bit")+" (byte) || "
                                                + bit2KB(FAT_size)+" (KB) || "+ bit2MB(FAT_size)+" (MB)" ;
})
document.getElementById("v_iNode").addEventListener("click", function () {
    var num_of_direct_block = parseInt(document.getElementById("num_of_direct_block").value);
    var deg1_block = parseInt(document.getElementById("deg1_block").value);
    var deg2_block= parseInt(document.getElementById("deg2_block").value);
    var deg3_block= parseInt(document.getElementById("deg3_block").value);
    var block_data_size = parseInt(document.getElementById("block_data_size").value);
    var block_pointer_size= parseInt(document.getElementById("block_pointer_size").value);
    var sl_block_data_size = document.getElementById("sl_block_data_size");
    var bds_unit = (sl_block_data_size.options[sl_block_data_size.selectedIndex].value);
    var sl_block_pointer_size = document.getElementById("sl_block_pointer_size");
    var bps_unit = (sl_block_pointer_size.options[sl_block_pointer_size.selectedIndex].value);
    block_data_size= convertToByte(block_data_size,bds_unit);
    block_pointer_size= convertToByte(block_pointer_size,bps_unit);
    console.log("số khối trực tiếp "+num_of_direct_block);
    console.log("số khối gián tiếp c1"+deg1_block);
    console.log("số khối gián tiếp c2 "+deg2_block);
    console.log("số khối gián tiếp c2 "+deg3_block);
    console.log("block_size "+block_data_size);
    console.log("pointer size "+block_pointer_size);

    var num_of_block_data= num_of_direct_block + deg1_block*num_of_direct_block + deg2_block*deg1_block*Math.pow(num_of_direct_block,2) + deg3_block*deg2_block*deg1_block*Math.pow(num_of_direct_block,3);
    var num_of_block_index= deg1_block + deg2_block*num_of_direct_block + deg3_block*Math.pow(num_of_direct_block,2);
    document.getElementById("num_of_block_data").value=num_of_block_data;
    document.getElementById("num_of_block_index").value=num_of_block_index;

    var max_file_size= num_of_block_data*(block_data_size-block_pointer_size);
    document.getElementById("max_file_size").value=max_file_size+ " (byte) ||"
    + bit2KB( byte2bit(max_file_size)) + " (KB) || "
    + bit2MB( byte2bit(max_file_size)) + " (MB) || "
    + bit2GB( byte2bit(max_file_size))+ " (GB)";
    document.getElementById("num_of_block_in_disk").value= num_of_block_data+num_of_block_index;
    var mf_in_disk=byte2bit((num_of_block_data+num_of_block_index)*block_data_size);
    document.getElementById("max_file_size_in_disk").value= convertToByte(mf_in_disk,"bit") + " (byte) || "
    + bit2KB(mf_in_disk)+" (KB) || "
    + bit2MB(mf_in_disk)+" (MB) || "
    + bit2GB(mf_in_disk)+" (GB)" ;

    
})
function Dec2Hex(num){
    return num.toString(16).toUpperCase();
}
function convertToByte(size, unit) {
    var p;
    if (unit == "bit") return size / 8;
    if (unit == "byte") p = 0;
    if (unit == "GB") p = 30;
    if (unit == "MB") p = 20;
    if (unit == "KB") p = 10;
    return size * Math.pow(2, p);
}
function byte2bit(size) {
    return size * 8;
}
function bit2KB(size) {
    return (size / 8) / (Math.pow(2, 10));
}
function bit2MB(size) {
    return (size / 8) / (Math.pow(2, 20));
}
function bit2GB(size) {
    return (size / 8) / (Math.pow(2, 30));
}
function bit2TB(size) {
    return (size / 8) / (Math.pow(2, 40));
}

function howManyBit(num) {
    return Math.ceil(Math.log2(num));
}
// console.log(howManyBit(200));