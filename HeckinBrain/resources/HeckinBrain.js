$('#plaintext_button').click(handle_plaintext);
$('#ciphertext_button').click(handle_ciphertext);

var plaintext = $('#plaintext_string').val();
var ciphertext = $('#ciphertext_string').val();

var register = 0;
var ptr = 0;

function update_register(register)
{
    $('#register').html(register);
    var elem = document.getElementById("register_bar");   
    elem.style.height = register + 'px'; 
}

function update_ptr(ptr)
{
    $('#ptr').html(ptr);
    var elem = document.getElementById("ptr_bar");   
    elem.style.height = ptr + 'px'; 
}

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
*/

function handle_plaintext()
{
    // let reg_update = setInterval(update_register, 500);
    // let ptr_update = setInterval(update_ptr, 500);

    plaintext = $('#plaintext_string').val();
    console.log("PLAINTEXT ENTERED: " + plaintext);

    let cipher_str = make_ciphertext(plaintext);
    print_ciphertext(cipher_str);

    // clearInterval(reg_update);
    // clearInterval(ptr_update);

    $('#plaintext_string').focus();
    $('#plaintext_string').val("");
    $('#plaintext_string').val(plaintext);

}

function make_ciphertext(str)
{
    register = 0;
    console.log("REGISTER INITIALIZED AT: " + register);

    ptr = 0;

    let cipher_str = "";

    /*
    let current_char = str[ptr];
    console.log(current_char);
    let target_value = str.charCodeAt(ptr);
    console.log(target_value);
    */

    for(; ptr < str.length; ptr++)
    {
        console.log("PTR AT: " + ptr);
        let current_char = str[ptr];
        console.log("CURRENT_CHAR AT: " + current_char);
        let target_value = str.charCodeAt(ptr);
        console.log("TARGET_VALUE AT: " + target_value);
        

        if(target_value > register)
        {
            let difference = target_value - register;
    
            for(let i = 0; i < difference; i++)
            {
                cipher_str += "p ";
                register++;
                console.log("REGISTER INCR TO: " + register)
                //await sleep(5);
            }
    
            cipher_str += "o ";
            console.log("OUTPUT");
            //await sleep(5);
        }
        else if(target_value < register)
        {
            let difference = register - target_value;
    
            for(let i = 0; i < difference; i++)
            {
                cipher_str += "m ";
                register--;
                console.log("REGISTER DECR TO: " + register)
                //await sleep(5);
            }
    
            cipher_str += "o ";
            console.log("OUTPUT");
            //await sleep(5);

        }
        else if(target_value = register)
        {
            cipher_str += "o ";
            console.log("REGISTER SAME AT: " + register)
            console.log("OUTPUT");
            //await sleep(5);
        }
        else
        {
            console.log("make_ciphertext ERROR!");
        }

        console.log("ONE PASS MADE");
    }

    update_register(register);
    update_ptr(ptr);

    return cipher_str;

}


function print_ciphertext(str)
{
    $('#ciphertext_string').val(str);
}


//////////////////////////////////////////////////////////////////////


function handle_ciphertext()
{
    ciphertext = $('#ciphertext_string').val();
    console.log("CIPHERTEXT ENTERED: " + ciphertext);

    let plain_str = make_plaintext(ciphertext);
    print_plaintext(plain_str);

    $('#ciphertext_string').focus();
    $('#ciphertext_string').val("");
    $('#ciphertext_string').val(ciphertext);
}



function make_plaintext(str)
{
    register = 0;
    console.log("REGISTER INITIALIZED AT: " + register);

    ptr = 0;

    let plain_str = "";

    for(; ptr < str.length; ptr++)
    {
        console.log("PTR AT: " + ptr);
        let current_instr = str[ptr];
        console.log("CURRENT_INSTR AT: " + current_instr);

        if(current_instr!= "p" && current_instr!= "m" && current_instr!= "o")
        {
            continue;
        }

        if(current_instr == "p")
        {
            register++;
            console.log("REGISTER INCR TO: " + register);
            //await sleep(500);
        }
        else if(current_instr == "m")
        {
            register--;
            console.log("REGISTER DECR TO: " + register);
            //await sleep(500);
        }
        else if (current_instr == "o")
        {
            let output_char = String.fromCharCode(register);
            console.log("CHARACTER OUTPUTTED: " + output_char);
            plain_str += output_char;
            console.log("PLAIN_STR AT: " + plain_str);
            ///await sleep(500);

        }
        else
        {
            console.log("MAKE_PLAINTEXT ERROR!");
        }
    }

    console.log("PLAIN STR FINISHED: " + plain_str);

    update_register(register);
    update_ptr(ptr);

    return plain_str;

}



function print_plaintext(str)
{
    $('#plaintext_string').val(str);
}
