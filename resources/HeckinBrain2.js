$('#plaintext_button2').click(handle_plaintext2);
$('#ciphertext_button2').click(handle_ciphertext2);

var plaintext2 = $('#plaintext_string2').val();
var ciphertext2 = $('#ciphertext_string2').val();

var register = 0;
var ptr = 0;

function update_register2(register)
{
    $('#register').html(register);
    var elem = document.getElementById("register_bar");   
    elem.style.height = register + 'px'; 
}

function update_ptr2(ptr)
{
    $('#ptr').html(ptr);
    var elem = document.getElementById("ptr_bar");   
    elem.style.height = ptr + 'px'; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function handle_plaintext2()
{
    // let reg_update = setInterval(update_register, 500);
    // let ptr_update = setInterval(update_ptr, 500);

    plaintext2 = $('#plaintext_string2').val();
    console.log("PLAINTEXT ENTERED: " + plaintext2);

    let cipher_str = make_ciphertext2(plaintext2);
    //print_ciphertext2(cipher_str);

    // clearInterval(reg_update);
    // clearInterval(ptr_update);

    //$('#plaintext_string2').focus();
    //$('#plaintext_string2').val("");
    //$('#plaintext_string2').val(plaintext2);

}

async function make_ciphertext2(str)
{
    
    register = 0;
    console.log("REGISTER INITIALIZED AT: " + register);

    ptr = 0;

    //let cipher_str = "";

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
                $('#ciphertext_string2').append("p ");
                register++;
                console.log("REGISTER INCR TO: " + register)
                update_register2(register);
                update_ptr2(ptr);
                await sleep(5);
            }
    
            $('#ciphertext_string2').append("o ");
            console.log("OUTPUT");
            update_register2(register);
            update_ptr2(ptr);
            await sleep(5);
        }
        else if(target_value < register)
        {
            let difference = register - target_value;
    
            for(let i = 0; i < difference; i++)
            {
                $('#ciphertext_string2').append("m ");
                register--;
                console.log("REGISTER DECR TO: " + register)
                update_register2(register);
                update_ptr2(ptr);
                await sleep(5);
            }
    
            $('#ciphertext_string2').append("o ");
            console.log("OUTPUT");
            update_register2(register);
            update_ptr2(ptr);
            await sleep(5);

        }
        else if(target_value = register)
        {
            $('#ciphertext_string2').append("o ");
            console.log("REGISTER SAME AT: " + register)
            console.log("OUTPUT");
            update_register2(register);
            update_ptr2(ptr);
            await sleep(5);
        }
        else
        {
            console.log("make_ciphertext ERROR!");
        }

        console.log("ONE PASS MADE");
    }

    //return cipher_str;

}

/*
function print_ciphertext2(str)
{
    $('#ciphertext_string2').val(str);
}
*/


//////////////////////////////////////////////////////////////////////


function handle_ciphertext2()
{
    ciphertext2 = $('#ciphertext_string2').val();
    console.log("CIPHERTEXT ENTERED: " + ciphertext2);

    let plain_str2 = make_plaintext2(ciphertext2);
    //print_plaintext2(plain_str2);

    //$('#ciphertext_string2').focus();
    //$('#ciphertext_string2').val("");
    //$('#ciphertext_string2').val(ciphertext2);
}



async function make_plaintext2(str)
{
    register = 0;
    console.log("REGISTER INITIALIZED AT: " + register);

    ptr = 0;

    //let plain_str = "";

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
            update_register2(register);
            update_ptr2(ptr);
            
            await sleep(5);
        }
        else if(current_instr == "m")
        {
            register--;
            console.log("REGISTER DECR TO: " + register);
            update_register2(register);
            update_ptr2(ptr);
            await sleep(5);
        }
        else if (current_instr == "o")
        {
            let output_char = String.fromCharCode(register);
            console.log("CHARACTER OUTPUTTED: " + output_char);
            //plain_str += output_char;
            //console.log("PLAIN_STR AT: " + plain_str);
            $('#plaintext_string2').append(output_char);
            update_register2(register);
            update_ptr2(ptr);
            await sleep(5);

        }
        else
        {
            console.log("MAKE_PLAINTEXT2 ERROR!");
        }
    }

    //console.log("PLAIN STR FINISHED: " + plain_str);

    //update_register2(register);
    //update_ptr2(ptr);

    //return plain_str;

}


/*
async function print_plaintext2(str)
{
    $('#plaintext_string2').val(str);
}
*/