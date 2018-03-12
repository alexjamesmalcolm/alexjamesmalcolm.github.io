function displayMandelbrot() {
    const canvas = document.body.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const rRange = [-2, 1];
    const iRange = [-1.5, 1.5];

    const loss = 100;
    let a = 1;
    const max_a = 20;
    let loopResolution = (depth, loss) => {
        setTimeout(() => {
        mandelbrotIterate(depth, loss); //mandelbrotIterate
        if(loss > 1) {
            loopResolution(depth, loss - 1);
        } else {
        }
    }, 100/loss);
    };
    loopResolution(20, Math.floor(width/4));

    function mandelbrotIterate(iteration, loss) {
        ctx.clearRect(0, 0, width, height);
        for (let r = 0; r < width; r+=loss) {
            for (let i = 0; i < height; i+=loss) {
                let pixel = [i, r];
                if(loss > 1) {
                    pixel[0] += loss / 2;
                    pixel[1] += loss / 2;
                }
                let z = pixelToComplex(pixel);
                let isIt = isInMandelbrot(z, iteration);
                if(isIt) {
                    paintBlackPixel(ctx, r, i, 1, 1, loss);
                }
            }
        }

        function pixelToComplex(pixel) {
            let x = pixel[0];
            let y = pixel[1];
            return [3 * x / width - 2, -1 * (3 * y / height - 1.5)];
        }

        function paintBlackPixel(ctx, x, y, a, max_a, loss) {
            ctx.fillStyle = "rgba(0, 0, 0, " + a / max_a + ")";
            ctx.fillRect(x, y, loss, loss);
        }

        function isInMandelbrot(z, iterations) {
            var i, a;
            a = z;
            for (i = 0; i < iterations; i++) {
                a = helper(a);                    
                if (a[0] > 2 || a[0] < -2 || a[1] > 2 || a[1] < -2) {
                    return false;
                }
            }
            return true;

            function helper(a) {
                var raisedToPower, sum;
                raisedToPower = square(a);
                sum = [raisedToPower[0] + z[0], raisedToPower[1] + z[1]];
                return sum;
            }
        }

        function square(z) {
            var rResult, iResult;
            rResult = z[0] * z[0] - z[1] * z[1];
            iResult = 2 * z[0] * z[1];
            return [rResult, iResult];
        }
    }
}   

function clearCanvas() {
    const canvas = document.body.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
}